import { defineStore } from 'pinia';
import { fetchFolderTree, fetchFolderContent, createFolder, deleteFolder, renameFolder } from '@/api/folder.api';
import type { Folder } from '@/types/folder';
import type { FileItem } from '@/types/file';
import { uploadFile, deleteFile, renameFile } from '@/api/file.api';

export const useExplorerStore = defineStore('explorer', {
  state: () => ({
    folders: [] as Folder[],
    selectedFolder: null as Folder | null,
    subFolders: [] as Folder[],
    files: [] as FileItem[],
    loading: false,
    expandedFolders: {} as Record<number, boolean>,
    subfoldersByParentId: {} as Record<number, Folder[]>,
  }),

  actions: {
    async loadFolderTree() {
      this.loading = true;
      try {
        const res = await fetchFolderTree();
        this.folders = res;
      } finally {
        this.loading = false;
      }
    },

    async toggleFolderInTree(folder: Folder) {
      this.selectedFolder = folder;

      if (this.expandedFolders[folder.id]) {
        this.expandedFolders[folder.id] = false;
        return;
      }

      this.expandedFolders[folder.id] = true;

      if (!this.subfoldersByParentId[folder.id]) {
        this.loading = true;
        try {
          const res = await fetchFolderContent(folder.id);
          this.subfoldersByParentId[folder.id] = res.folders;
          this.files = res.files;
        } finally {
          this.loading = false;
        }
      } else {
        const res = await fetchFolderContent(folder.id);
        this.files = res.files;
      }
    },

    toggleFolder(folder: Folder) {
      this.expandedFolders[folder.id] = !this.expandedFolders[folder.id];
      if (this.expandedFolders[folder.id]) {
      }
    },

    async handleFolderClick(folder: Folder) {
      this.selectFolderForContent(folder);
      this.toggleFolderInTree(folder);
    },

    async selectFolder(folder: Folder) {
      this.loading = true;
      try {
        const res = await fetchFolderContent(folder.id);
        console.log(res);

        this.selectedFolder = folder;
        this.subFolders = res.folders;
        this.files = res.files;
      } finally {
        this.loading = false;
      }
    },

    async goBack() {
      if (this.selectedFolder && this.selectedFolder.parentId) {
        const parentFolder = { id: this.selectedFolder.parentId, name: 'Parent Folder' };
        await this.selectFolder(parentFolder as any);
      } else {
        this.selectedFolder = null;
        this.subFolders = [];
        this.files = [];
        await this.loadFolderTree();
      }
    },

    async addFolder(name: string) {
      const parentId = this.selectedFolder ? this.selectedFolder.id : null;

      this.loading = true;
      try {
        const res = await createFolder(name, parentId);
        const newFolder = res;

        if (parentId) {
          this.subFolders.push(newFolder);
        } else {
          this.folders.push(newFolder);
        }
      } catch (error) {
        console.error('Failed to create folder:', error);
        alert('Could not create the folder.');
      } finally {
        this.loading = false;
      }
    },

    async deleteFolder(folderId: number) {
      this.loading = true;
      try {
        await deleteFolder(folderId);

        this.folders = this.folders.filter(f => f.id !== folderId);
        this.subFolders = this.subFolders.filter(f => f.id !== folderId);
        if (this.selectedFolder?.id === folderId) this.selectedFolder = null;
      } catch (error) {
        console.error('Delete failed', error);
      } finally {
        this.loading = false;
      }
    },

    async uploadFile(file: File) {
      this.loading = true;
      try {
        const folderId = this.selectedFolder ? this.selectedFolder.id : null;

        const newFile = await uploadFile(file, folderId);

        this.files.push(newFile);
      } catch (error) {
        console.error('Upload failed', error);
      } finally {
        this.loading = false;
      }
    },

    async deleteFile(fileId: number) {
      this.loading = true;
      try {
        await deleteFile(fileId);
        this.files = this.files.filter(f => f.id !== fileId);
      } finally {
        this.loading = false;
      }
    },

    async renameFolder(id: number, newName: string) {
      await renameFolder(id, newName);

      const folder = this.folders.find(f => f.id === id) || this.subFolders.find(f => f.id === id);
      if (folder) folder.name = newName;
    },

    async renameFile(id: number, newName: string) {
      await renameFile(id, newName);

      const file = this.files.find(f => f.id === id);
      if (file) file.name = newName;
    },

    async selectFolderForContent(folder: Folder) {
      this.loading = true;
      this.selectedFolder = folder;
      try {
        const res = await fetchFolderContent(folder.id);
        this.subFolders = res.folders;
        this.files = res.files;
      } finally {
        this.loading = false;
      }
    },

  },
});
