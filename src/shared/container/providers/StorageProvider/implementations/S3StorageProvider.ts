import { S3 } from "aws-sdk";

import fs from "fs";
import { resolve } from "path";
import mime from "mime";

import { tmpFolder } from "@config/upload";
import { Folder, IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: Folder): Promise<string> {
    const originalPath = resolve(tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Key: file,
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        ACL: "public-read",
        Body: fileContent,
        ContentType: mime.getType(originalPath), // See in browser
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  async remove(file: string, folder: Folder): Promise<void> {
    await this.client
      .deleteObject({
        Key: file,
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      })
      .promise();

    return;
  }
}

export { S3StorageProvider };
