import { api } from './axios';
import type { Folder } from '@/types/folder';
import type { File } from '@/types/file';

export const fetchFolderTree = (): Promise<Folder> => {
  return api.get('/v1/folder-tree');
};

export const fetchFolderContent = async (
  id: number,
): Promise<{ subfolders: Folder[]; files: File[]; }> => {
  return api.get(`/v1/folders/${id}`);
};

export const createFolder = async (name: string, parentId: number | null): Promise<Folder> => {
  const response = await api.post('/v1/folders', { name, parentId });

  return response as unknown as Folder;
};

export const deleteFolder = async (id: number) => {
  return api.delete(`/v1/folders/${id}`);
};

export const renameFolder = async (id: number, newName: string) => {
  return api.patch(`/v1/folders/${id}`, { name: newName });
};