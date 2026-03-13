import { Elysia } from "elysia";
import {
  getFiles,
  getFileById,
  uploadFile,
  renameFile,
  deleteFile,
} from "./file.controller";
import { UploadFileDTO } from "./dto/upload-file.dto";
import { UpdateFileDTO } from "./dto/update-file.dto";

export const fileRoutes = new Elysia({
  prefix: "/api/v1/files",
})
  .get("/", getFiles)
  .get("/:id", getFileById)
  .post("/", uploadFile, {
    body: UploadFileDTO,
  })
  .patch("/:id", renameFile, {
    body: UpdateFileDTO,
  })
  .delete("/:id", deleteFile);
