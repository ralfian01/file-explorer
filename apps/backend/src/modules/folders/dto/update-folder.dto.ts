import { t } from "elysia";

export const UpdateFolderDTO = t.Object({
  name: t.Optional(
    t.String({
      minLength: 1,
      error: "Folder name must not be empty",
    }),
  ),
  parentId: t.Optional(t.Number()),
});

export type UpdateFolderDTOType = typeof UpdateFolderDTO.static;
