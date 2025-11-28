export class DashboardDocument {
  id: string
  name: string
  description: string | null
  image: string | null
  file: File

  constructor(id: string, name: string, description: string | null, image: string | null) {
    this.id = id
    this.name = name
    this.description = description
    this.image = image
    this.file = this.generateFile()
  }

  generateFile(): File {
    const file = new File([this.name + '\n' + this.description], this.name, {
      type: 'text/plain',
    })
    return file
  }

  getSize(): string {
    return this.file.size > 1024
      ? `${(this.file.size / 1024).toFixed(2)} MB`
      : `${(this.file.size / 1024).toFixed(2)} KB`
  }
}
