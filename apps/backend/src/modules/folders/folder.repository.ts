import { prisma } from "../../database/prisma";

export class FolderRepository {
  async getFolderTree(id: number | null) {
    return prisma.folder.findMany({
      orderBy: { id: "desc" },
      where: {
        parentId: id
      }
    });
  }

  async getFolders({ skip, take }: any) {
    return prisma.folder.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async countFolders() {
    return prisma.folder.count();
  }

  async getSubFolders(parentId: number) {
    return prisma.folder.findMany({
      where: { parentId },
    });
  }

  async getFiles(folderId: number) {
    return prisma.file.findMany({
      where: { folderId },
    });
  }

  async createFolder(data: { name: string; parentId?: number | null; }) {
    return prisma.folder.create({
      data: {
        name: data.name,
        parentId: data.parentId ?? null,
      },
    });
  }

  async updateFolder(id: number, data: { name?: string; parentId?: number; }) {
    return prisma.folder.update({
      where: { id },
      data,
    });
  }

  async deleteFolder(id: number) {
    return prisma.folder.delete({
      where: { id },
    });
  }
}
