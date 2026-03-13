import { FileRepository } from "./file.repository";

export class FileService {
  private repo = new FileRepository();

  async getAllFiles() {
    return this.repo.getAllFiles();
  }

  async getFileById(id: number) {
    return this.repo.getFileById(id);
  }

  async uploadFile(file: File, folderId: number) {
    const fileName = `${Date.now()}-${file.name}`;
    const path = `uploads/${fileName}`;

    await Bun.write(path, file);

    return this.repo.createFile({
      name: file.name,
      path,
      folderId,
      size: file.size,
      mimeType: file.type,
    });
  }

  async renameFile(id: number, name: string) {
    return this.repo.renameFile(id, name);
  }

  async deleteFile(id: number) {
    const file = await this.repo.getFileById(id);

    if (!file) {
      throw new Error("File not found");
    }

    try {
      await Bun.file(file.path).delete();
    } catch {
      // ignore jika file tidak ada di disk
    }

    return this.repo.deleteFile(id);
  }
}
