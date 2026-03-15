import type { FileItem } from '@/types/file';
import { api } from './axios';

export const uploadFile = async (file: File, folderId: number | null): Promise<FileItem> => {
  const formData = new FormData();
  formData.append('file', file);

  // Berdasarkan error "Expected required property: /folderId", 
  // API Anda sepertinya menolak nilai null. 
  // Jika root folder memiliki ID khusus (misal 0), gunakan itu.
  // Jika tidak boleh null, berikan ID 0 atau sesuaikan dengan kebutuhan backend.
  if (folderId !== null) {
    formData.append('folderId', folderId.toString());
  } else {
    // COBA INI: Jika di root, apakah API butuh ID tertentu? 
    // Jika tidak tahu, coba kirim 0 atau 1 (sesuaikan dengan default API Anda)
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
