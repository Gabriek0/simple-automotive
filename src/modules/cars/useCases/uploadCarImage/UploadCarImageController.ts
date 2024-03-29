import { container } from "tsyringe";
import { Request, Response } from "express";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((image) => image.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
