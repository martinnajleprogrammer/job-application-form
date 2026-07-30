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
      className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-neutral-300 rounded-card p-6 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors focus:outline-none focus:border-primary-500"

    >
      {field.value instanceof File ? (
        <span className="text-sm text-primary-600 font-medium">{(field.value as File).name}</span>
      ) : (
        <>
          <span className="text-sm text-neutral-500">{label ?? "Drop your PDF here or click to browse"}</span>
          <span className="text-xs text-neutral-400">PDF only · max 5MB</span>
        </>
      )}
      {sizeError && <span className="text-xs text-error-600">{sizeError}</span>}
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