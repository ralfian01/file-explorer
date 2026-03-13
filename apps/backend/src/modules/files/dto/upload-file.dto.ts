import { t } from "elysia";

export const UploadFileDTO = t.Object({
  folderId: t.Numeric(),
  file: t.File(),
});

export type UploadFileDTOType = typeof UploadFileDTO.static;
