import { prisma } from "../../database/prisma";

export class FileRepository {
  async getAllFiles() {
    return prisma.file.findMany();
  }

  async getFileById(id: number) {
    return prisma.file.findUnique({
      where: { id },
    });
  }

  async createFile(data: {
    name: string;
    path: string;
    folderId: number;
    size: number;
    mimeType: string;
  }) {
    return prisma.file.create({
      data,
    });
  }

  async renameFile(id: number, name: string) {
    return prisma.file.update({
      where: { id },
      data: { name },
    });
  }

  async deleteFile(id: number) {
    return prisma.file.delete({
      where: { id },
    });
  }
}
