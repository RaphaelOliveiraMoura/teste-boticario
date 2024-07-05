import { readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { IFileSystemService } from "@/domain/services/file-system";

export class FileSystemNodeService implements IFileSystemService {
  private getContextPath(ctx: ImportMeta | string) {
    if (typeof ctx === "string") return ctx;
    return dirname(fileURLToPath(ctx.url));
  }

  resolvePath(pathOrFilename: string, ctx?: ImportMeta | string): string {
    if (ctx) return resolve(this.getContextPath(ctx), pathOrFilename);
    return resolve(pathOrFilename);
  }

  readFile(path: string): Promise<string> {
    return readFile(path, "utf-8");
  }
}
