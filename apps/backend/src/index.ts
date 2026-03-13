import { Elysia } from "elysia";
import { folderRoutes } from "./modules/folders/folder.routes";
import { fileRoutes } from "./modules/files/file.routes";
import cors from "@elysiajs/cors";

const app = new Elysia();

app.onError(({ code, error }) => {
  if (code === "VALIDATION") {
    return {
      success: false,
      message: "Validation failed",
      errors: error.all.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    };
  }

  return {
    success: false,
    message: (error as Error).message,
  };
});

app.use(folderRoutes);
app.use(fileRoutes);

// Enable CORS
app.use(
  cors({
    origin: "*",
  }),
);

app.listen(3100);

console.log("Server running on http://localhost:3100");
