import { useRef } from "react"

const Album = () => {
  const inputEl = useRef<HTMLInputElement>()

  function openAlbum() {
    // 校验是否支持 File API
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      if (!inputEl.current) inputEl.current = document.createElement("input")

      inputEl.current.type = "file"
      // 限制只能选择文件
      // inputEl.current.accept = "image/*"
      inputEl.current.addEventListener("change", handleImages, false)
      inputEl.current.click()
    } else {
      console.log("不支持 File API")
    }
  }

  function handleImages(e: Event) {
    const files = (e.target as HTMLInputElement).files ?? []

    for (let i = 0; i < files?.length; i++) {
      handleImage(files[i])
    }
  }

  // @ts-expect-error todo
  function handleImage(file) {
    console.log("image =>", file.name)
  }

  return (
    <div>
      <button
        style={{ border: "solid 1px black" }}
        onClick={() => {
          console.log("from-button")
          openAlbum()
        }}
      >
        open album
      </button>
      <div>
        "image/*"
        <input
          type="file"
          name="input-image"
          onChange={(e) => {
            Array.from(e.target.files || []).forEach((f) => {
              console.log(f.name, f.type)
            })
          }}
          accept="image/*"
          onClick={() => console.log("from-image")}
          capture={false}
        />
      </div>
      <div>
        "video/*"
        <input
          type="file"
          name="input-video"
          onChange={(e) => {
            Array.from(e.target.files || []).forEach((f) => {
              console.log(f.name, f.type)
            })
          }}
          accept="video/*"
          onClick={() => console.log("from-video")}
          capture={false}
        />
      </div>
      <div>
        "no-accept"
        <input
          type="file"
          name="input-no-accept"
          onChange={(e) => {
            Array.from(e.target.files || []).forEach((f) => {
              console.log(f.name, f.type)
            })
          }}
          onClick={() => console.log("from-no-accept")}
          capture={false}
        />
      </div>
    </div>
  )
}

export default Album
