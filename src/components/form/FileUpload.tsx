import { useRef, useState } from "react"
import { useController } from "react-hook-form"

type FileUploadProps = {
  name: string
  accept?: string
  maxSize?: number
  label?: string
}

const FileUpload = ({ name, accept, maxSize, label }: FileUploadProps) => {
  const { field } = useController({ name })
  const inputRef = useRef<HTMLInputElement>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragEnter = () => {
    // aquí después podés cambiar estilos visuales del área
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return

    if (maxSize && file.size > maxSize) {
      setSizeError(`File exceeds maximum size of ${maxSize} bytes`)
      return
    }

    setSizeError(null)
    field.onChange(file)

    if (inputRef.current) {
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      inputRef.current.files = dataTransfer.files
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (maxSize && file.size > maxSize) {
      setSizeError(`File exceeds maximum size of ${maxSize} bytes`)
      return
    }
    setSizeError(null)
    field.onChange(file)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
    >
      <label>{label ?? "Drop your file or browse"}</label>
      {field.value && <span>{(field.value as File).name}</span>}
      {sizeError && <span>{sizeError}</span>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        hidden
      />
    </div>
  )
}

export default FileUpload