import { t } from "elysia";

export const UpdateFileDTO = t.Object({
  name: t.String({
    minLength: 1,
  }),
});

export type UpdateFileDTOType = typeof UpdateFileDTO.static;
