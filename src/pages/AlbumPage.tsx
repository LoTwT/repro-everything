/* eslint-disable @typescript-eslint/no-explicit-any */
// import Album from "../components/Album"

import { useRef } from "react"

// function isMobileIOS() {
//   const userAgent = navigator.userAgent || navigator.vendor

//   // 对iPhone, iPod或iPad进行检测
//   return /iPad|iPhone|iPod/.test(userAgent)
// }

const AlbumPage = () => {
  function handleImageChange() {
    console.log("handle image change")
  }
  const inputRef = useRef<HTMLInputElement>(null)

  async function check() {
    console.log(!!navigator.permissions)
    if (!navigator || !navigator.permissions) return false

    // @ts-expect-error type error
    const status = await navigator.permissions.query({ name: "camera" })
    console.log(status.name, status.state)
    return status.state !== "denied"
  }

  // useEffect(() => {
  //   foo()
  // }, [])

  async function foo() {
    const s = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    s.getTracks().forEach(t => t.stop())
    console.log("get-user-media success")
  }

  return (
    // <Album />
    <div>
      <label
        style={{ marginBottom: "50px", display: "block" }}
        className="bg-ppcn-blue-500 w-full h-full py-4 rounded-xl flex justify-center items-center cursor-pointer"
        onClick={async () => {
          try {
            const has = await check()
            await foo()
            if (has) inputRef.current?.click()
          } catch (error) {
            console.error("无法启用相机或相册，请在设置中授予相应权限")
            // @ts-expect-error aaa
            console.log(error.name, error.message)
          }
        }}
      >
        <span className="ml-2 web-caption-large-regular text-white">
          扫描名片 快速录入信息
        </span>
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        id="scan"
        onChange={handleImageChange}
        className="sr-only"
      />
    </div>
  )
}

export default AlbumPage
