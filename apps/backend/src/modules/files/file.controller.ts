import { FileService } from "./file.service";
import type { UploadFileDTOType } from "./dto/upload-file.dto";

const fileService = new FileService();

export const getFiles = async () => {
  return fileService.getAllFiles();
};

export const getFileById = async ({ params }: any) => {
  const id = Number(params.id);
  return fileService.getFileById(id);
};

export const uploadFile = async ({ body }: { body: UploadFileDTOType }) => {
  const { file, folderId } = body;

  return fileService.uploadFile(file, folderId);
};

export const renameFile = async ({ params, body }: any) => {
  const id = Number(params.id);
  return fileService.renameFile(id, body.name);
};

export const deleteFile = async ({ params }: any) => {
  const id = Number(params.id);
  return fileService.deleteFile(id);
};
