interface IStorageProvider {
  save(file: string, folder: Folder): Promise<string>;
  remove(file: string, folder: Folder): Promise<void>;
}

export type Folder = "avatar" | "cars";

export { IStorageProvider };
