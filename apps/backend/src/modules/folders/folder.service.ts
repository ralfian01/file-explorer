import { FolderRepository } from "./folder.repository";

export class FolderService {
  private repo = new FolderRepository();

  async getFolderTree(id: number | null) {
    return this.repo.getFolderTree(id);
  }

  async getFolders(pagination: any) {
    const folders = await this.repo.getFolders(pagination);
    const total = await this.repo.countFolders();

    return {
      data: folders,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async getFolderContent(folderId: number) {
    const [folders, files] = await Promise.all([
      this.repo.getSubFolders(folderId),
      this.repo.getFiles(folderId),
    ]);

    return {
      folders,
      files,
    };
  }

  async createFolder(name: string, parentId?: number | null) {
    return this.repo.createFolder({
      name,
      parentId,
    });
  }

  async updateFolder(id: number, data: { name?: string; parentId?: number; }) {
    return this.repo.updateFolder(id, data);
  }

  async deleteFolder(id: number) {
    return this.repo.deleteFolder(id);
  }
}
