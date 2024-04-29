import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import styles from "./index.module.css"
import cx from "classnames"

type FacingMode = "user" | "environment"

export interface CustomCameraProps {
  facingMode?: FacingMode
  frame?: Partial<CustomCameraFrame>
}

export interface CustomCameraFrame {
  className: string
  /**
   * @see // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
   */
  destination: Partial<{
    x: number
    y: number
    width: number
    height: number
  }>
}

export interface CustomCameraRef {
  snapshot: () => string
  switchCamera: (facingMode?: FacingMode) => void
}

const CustomCamera = forwardRef<CustomCameraRef, CustomCameraProps>(
  (props, ref) => {
    const { facingMode = "user", frame } = props

    const videoRef = useRef<HTMLVideoElement>(null)
    const videoStream = useRef<MediaStream>()

    const canvasEl = useRef<HTMLCanvasElement>()
    const frameRef = useRef<HTMLDivElement>(null)

    const canSwitchCamera = useRef(false)

    useEffect(() => {
      checkCamera()
    }, [])

    useEffect(() => {
      loadStream(facingMode)
    }, [facingMode])

    const snapshot: CustomCameraRef["snapshot"] = () => {
      if (!canvasEl.current) canvasEl.current = document.createElement("canvas")
      const ctx = canvasEl.current.getContext("2d")!

      if (videoRef.current && frameRef.current) {
        const {
          offsetLeft: sx,
          offsetTop: sy,
          offsetWidth: sWidth,
          offsetHeight: sHeight,
        } = frameRef.current

        const {
          x: dx = 0,
          y: dy = 0,
          width: dWidth = sWidth,
          height: dHeight = sHeight,
        } = frame?.destination || {}

        canvasEl.current.width = sWidth
        canvasEl.current.height = sHeight

        // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
        ctx.drawImage(
          videoRef.current,
          sx,
          sy,
          sWidth,
          sHeight,
          dx,
          dy,
          dWidth,
          dHeight
        )
        return canvasEl.current.toDataURL("image/png")
      } else {
        throw new Error("Fail to snapshot.")
      }
    }

    const switchCamera: CustomCameraRef["switchCamera"] = (f?: FacingMode) => {
      if (!canSwitchCamera.current) return

      let targetMode: FacingMode

      if (f) targetMode = f
      else {
        const curMode = videoStream.current
          ?.getVideoTracks()[0]
          .getConstraints().facingMode as FacingMode
        targetMode = curMode === "user" ? "environment" : "user"
      }

      loadStream(targetMode)
    }

    useImperativeHandle(ref, () => ({
      snapshot,
      switchCamera,
    }))

    async function loadStream(facingMode: FacingMode) {
      if (navigator.mediaDevices === undefined) {
        // @ts-expect-error polyfill
        navigator.mediaDevices = {}
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          const getUserMedia =
            // @ts-expect-error polyfill
            navigator.getUserMedia ||
            // @ts-expect-error polyfill
            navigator.webkitGetUserMedia ||
            // @ts-expect-error polyfill
            navigator.mozGetUserMedia

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            )
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }

      videoStream.current?.getTracks().forEach((t) => t.stop())

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode,
          width: Math.max(window.innerWidth, window.innerHeight),
          height: Math.min(window.innerWidth, window.innerHeight),
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      videoStream.current = stream
      videoRef.current && (videoRef.current.srcObject = stream)
    }

    async function checkCamera() {
      const devices = await navigator.mediaDevices.enumerateDevices()
      canSwitchCamera.current =
        devices.filter((d) => d.kind === "videoinput").length > 1
    }

    return (
      <div className={styles["custom-camera"]}>
        <video className={styles.video} ref={videoRef} autoPlay={true}></video>
        <div ref={frameRef} className={cx(styles.frame, frame?.className)} />
      </div>
    )
  }
)

export default CustomCamera
