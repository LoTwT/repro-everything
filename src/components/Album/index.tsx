import { useRef } from "react"

const Album = () => {
  const inputEl = useRef<HTMLInputElement>()

  function openAlbum() {
    // 校验是否支持 File API
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      if (!inputEl.current) inputEl.current = document.createElement("input")

      inputEl.current.type = "file"
      // 限制只能选择文件
      inputEl.current.accept = "image/*"
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

  const imgRef = useRef<HTMLImageElement>(null)

  function handleImage(file: File) {
    const reader = new FileReader()
    reader.onload = function (e) {
      if (e.target?.result) imgRef.current!.src = e.target.result.toString()
    }

    reader.readAsDataURL(file)
  }

  return (
    <div>
      <button
        style={{ border: "solid 1px black" }}
        onClick={() => {
          openAlbum()
        }}
      >
        open album
      </button>
      <img ref={imgRef} alt="preview-image" />
    </div>
  )
}

export default Album
