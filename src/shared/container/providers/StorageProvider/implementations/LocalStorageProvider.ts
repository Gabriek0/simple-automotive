import fs from "fs";
import { resolve } from "path";

import { Folder, IStorageProvider } from "../IStorageProvider";

import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: Folder): Promise<string> {
    // Get file of tmp folder and put into avatar or car folder

    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }
  async remove(file: string, folder: Folder): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // find file
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    // removes file
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
