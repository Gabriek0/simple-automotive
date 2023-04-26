import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  save(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  remove(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { LocalStorageProvider };
