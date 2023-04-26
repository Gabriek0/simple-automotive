interface IStorageProvider {
  save(file: string, folder: string): Promise<string>;
  remove(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
