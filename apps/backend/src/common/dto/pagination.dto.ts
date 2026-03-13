import { t } from "elysia";

export const PaginationQueryDTO = t.Object({
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
});
