import type { FileItem } from '@/types/file';
import { api } from './axios';

export const uploadFile = async (file: File, folderId: number | null): Promise<FileItem> => {
  const formData = new FormData();
  formData.append('file', file);

  if (folderId !== null) {
    formData.append('folderId', folderId.toString());
  } else {
    formData.append('folderId', '0');
  }

  const response = await api.post('/v1/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response as unknown as FileItem;
};

export const renameFile = async (id: number, newName: string) => {
  return api.patch(`/v1/files/${id}`, { name: newName });
};

export const deleteFile = async (id: number) => {
  return api.delete(`/v1/files/${id}`);
};
