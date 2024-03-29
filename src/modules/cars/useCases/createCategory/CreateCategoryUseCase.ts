import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findCategoryByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category alredy exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
