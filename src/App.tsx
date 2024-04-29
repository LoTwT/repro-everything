import "@unocss/reset/tailwind.css"
import { useState } from "react"
import CameraPage from "./pages/CameraPage"
import AlbumPage from "./pages/AlbumPage"

function App() {
  const [showCamera, setShowCamera] = useState(true)

  return (
    <>
      <div>Current is {showCamera ? "camera" : "album"}</div>
      <button
        style={{ border: "solid 1px black" }}
        onClick={() => setShowCamera((v) => !v)}
      >
        change camera / album
      </button>
      {showCamera ? <CameraPage /> : <AlbumPage />}
    </>
  )
}

export default App
