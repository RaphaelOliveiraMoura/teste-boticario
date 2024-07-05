export interface IFileSystemService {
  resolvePath(pathOrFilename: string, ctx?: ImportMeta | string): string;

  readFile(path: string): Promise<string>;
}
