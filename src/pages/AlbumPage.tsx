/* eslint-disable @typescript-eslint/no-explicit-any */
// import Album from "../components/Album"

// function isMobileIOS() {
//   const userAgent = navigator.userAgent || navigator.vendor

//   // 对iPhone, iPod或iPad进行检测
//   return /iPad|iPhone|iPod/.test(userAgent)
// }

async function check() {
  if (!navigator || !navigator.mediaDevices) {
    console.log("no navigator or mediaDevices")
    throw new Error("no navigator or mediaDevices error")
  }

  try {
    // @ts-expect-error type error
    const status = await navigator.permissions.query({ name: "camera" })
    console.log("status =>", status.name, status.state)
  } catch (error: any) {
    console.log("status error =>", error.name, error.message)
    throw error
  }

  console.log("???")

  try {
    const s = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    s.getTracks().forEach((t) => t.stop())
    console.log("----")
  } catch (error: any) {
    console.log("get-user =>", error.name, error.message)
    throw error
  }
}

const AlbumPage = () => {
  function handleImageChange() {
    console.log("handle image change")
  }

  async function handleLabelClick(
  ) {
    try {
      await check()
    } catch (error: any) {
      // e.preventDefault()
      console.log("handle-label-click", error.name, error.message)
    }
  }

  return (
    // <Album />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="scan" onClick={handleLabelClick} >
        scan label
      </label>
      <input
        id="scan"
        type="file"
        accept="image/*"
        style={{ appearance: "none", marginTop: "50px" }}
        onChange={(e) => {
          handleImageChange()
          console.log(e.target.files?.length)
          e.target.onerror = () => {
            console.log("onchange target error")
          }
          e.currentTarget.onerror = () => {
            console.log("onchange currentTarget error")

          }
        }}
        onError={(e) => {
          console.log("input error", e)
        }}
        onErrorCapture={() => {
          console.log("error capture")
        }}
        onChangeCapture={() => {
          console.log("change capture")
        }}
      />
    </div>
  )
}

export default AlbumPage
