import "@unocss/reset/tailwind.css"
// import { useEffect, useState } from "react"
// import CameraPage from "./pages/CameraPage"
import AlbumPage from "./pages/AlbumPage"
import { useEffect } from "react"

async function check() {
  if (!navigator.mediaDevices) {
    console.log('???')
    return
  }

  const devices = await navigator.mediaDevices.enumerateDevices()
  const cameras = devices.filter(d => d.kind === 'videoinput')
  console.log('=>', cameras)
}

function App() {
  // const [showCamera, setShowCamera] = useState(true)

  useEffect(() => {
    try {
      check()
    } catch (error) {
      console.log("catched", error)
    }
  }, [])

  return (
    <>
      {/* <div>Current is {showCamera ? "camera" : "album"}</div>
      <button
        style={{ border: "solid 1px black" }}
        onClick={() => setShowCamera((v) => !v)}
      >
        change camera / album
      </button>
      {showCamera ? <CameraPage /> : <AlbumPage />} */}
      <AlbumPage />
    </>
  )
}

export default App
