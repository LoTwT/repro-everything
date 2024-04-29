import "@unocss/reset/tailwind.css"
import CustomCamera, { CustomCameraRef } from "./components/CustomCamera"
import { useRef, useState } from "react"

function App() {
  const r = useRef<CustomCameraRef>(null)
  const [imageData, setImageData] = useState("")

  return (
    <div>
      <button
        style={{ border: "solid 1px black" }}
        onClick={() => r.current?.switchCamera()}
      >
        switchCamera
      </button>
      <button
        style={{ border: "solid 1px black", marginLeft: "4px" }}
        onClick={() => setImageData(r.current!.snapshot())}
      >
        snapshot
      </button>

      <CustomCamera ref={r} />
      <img src={imageData} alt="camera snapshot" />
    </div>
  )
}

export default App
