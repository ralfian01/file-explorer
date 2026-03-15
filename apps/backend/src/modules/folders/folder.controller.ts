import { FolderService } from "./folder.service";
import type { CreateFolderDTOType } from "./dto/create-folder.dto";
import type { UpdateFolderDTOType } from "./dto/update-folder.dto";
import { getPagination } from "../../common/utils/pagination";

const folderService = new FolderService();

export const getFolderTree = async ({ params }: any) => {
  const id = Number(params?.id) ?? null;

  return folderService.getFolderTree(id);
};

export const getFolders = async ({ query }: any) => {
  const { page, limit, skip, take } = getPagination(
    Number(query.page),
    Number(query.limit),
  );

  return folderService.getFolders({
    page,
    limit,
    skip,
    take,
  });
};

export const getFolderContent = async ({ params }: any) => {
  const id = Number(params.id);

  return folderService.getFolderContent(id);
};

export const createFolder = async ({ body }: { body: CreateFolderDTOType; }) => {
  const { name, parentId } = body;

  if (!name) {
    return {
      status: 400,
      message: "Folder name is required",
    };
  }

  return folderService.createFolder(name, parentId);
};

export const updateFolder = async ({
  params,
  body,
}: {
  params: { id: string; };
  body: UpdateFolderDTOType;
}) => {
  const id = Number(params.id);

  return folderService.updateFolder(id, body);
};

export const deleteFolder = async ({ params }: { params: { id: string; }; }) => {
  const id = Number(params.id);

  return folderService.deleteFolder(id);
};
