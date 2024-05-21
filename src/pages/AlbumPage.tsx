/* eslint-disable @typescript-eslint/no-explicit-any */
// import Album from "../components/Album"

import { useEffect, useRef } from "react"

// function isMobileIOS() {
//   const userAgent = navigator.userAgent || navigator.vendor

//   // 对iPhone, iPod或iPad进行检测
//   return /iPad|iPhone|iPod/.test(userAgent)
// }

function isWeChatBrowser() {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes("micromessenger")
}

const AlbumPage = () => {
  function handleImageChange() {
    console.log("handle image change")
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log("isInWeChat", isWeChatBrowser())
  }, [])

  async function check() {
    console.log("permission =>", !!navigator.permissions)
    if (!navigator.permissions) return true

    // @ts-expect-error type error
    const status = await navigator.permissions.query({ name: "camera" })
    console.log("status =>", status.name, status.state)
    return status.state
  }

  async function foo() {
    const s = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    s.getTracks().forEach((t) => t.stop())
    console.log("get-user-media success")
  }

  return (
    <div>
      <label
        style={{ marginBottom: "50px", display: "block" }}
        onClick={async (e) => {
          e.preventDefault()
          try {
            const has = await check()

            if (has === true || has === "granted") {
              console.log("has-permission")
              inputRef.current?.click()
            } else if (has === "prompt") {
              console.log("prompt-permission")
              await foo()
              inputRef.current?.click()
            } else {
              console.log("deny-permission")
              throw new Error("deny-permission")
            }
          } catch (error) {
            console.error("无法启用相机或相册，请在设置中授予相应权限")
            // @ts-expect-error aaa
            console.log(error.name, error.message)
          }
        }}
      >
        <span className="ml-2 web-caption-large-regular text-white">
          扫描名片 快速录入信息2
        </span>
      </label>
      <input
        onClick={() => {
          console.log("input-click")
        }}
        ref={inputRef}
        type="file"
        accept="image/*"
        id="scan"
        onChange={handleImageChange}
        className="sr-only"
      />

      <button
        style={{
          marginTop: "50px",
        }}
        onClick={() => {
          console.log("btn-click")
          inputRef.current?.click()
        }}
      >
        btn
      </button>
    </div>
  )
}

export default AlbumPage
