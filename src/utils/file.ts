import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // find file
    await fs.promises.stat(filename);
  } catch {
    return;
  }

  // removes file
  await fs.promises.unlink(filename);
};
