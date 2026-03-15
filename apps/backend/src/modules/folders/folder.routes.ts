import { Elysia } from "elysia";
import {
  getFolderContent,
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderTree,
} from "./folder.controller";
import { CreateFolderDTO } from "./dto/create-folder.dto";
import { UpdateFolderDTO } from "./dto/update-folder.dto";

export const folderRoutes = new Elysia({ prefix: "/api/v1/folders" })
  .get("/", getFolders)
  .get("/:id", getFolderContent)
  .post("/", createFolder, {
    body: CreateFolderDTO,
  })
  .patch("/:id", updateFolder, {
    body: UpdateFolderDTO,
  })
  .delete("/:id", deleteFolder);

export const folderTreeRoutes = new Elysia({ prefix: "/api/v1/folder-tree" })
  .get("/", getFolderTree)
  .get("/:id", getFolderTree);