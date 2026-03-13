import { t } from "elysia";

export const CreateFolderDTO = t.Object({
  name: t.String({
    minLength: 1,
  }),
  parentId: t.Optional(t.Number()),
});

export type CreateFolderDTOType = typeof CreateFolderDTO.static;
