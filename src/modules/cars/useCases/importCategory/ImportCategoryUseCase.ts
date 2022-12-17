import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<ICategoriesRepository> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          // ["Name", "Description"]
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        });
    });
  }

  execute(file: Express.Multer.File): void {
    const categories = this.loadCategories(file);

    console.log(categories);
  }
}

export { ImportCategoryUseCase };
