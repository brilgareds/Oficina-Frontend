import { CategoryParamsDto } from "../category/dto/category.params";
import { CategoryRepository } from "../category/repositories/category.repository";

export class RrhhService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async getWeAreForYouCategories() {
    try {
      const categories = await this.categoryRepository.findCategoryByAttributes(
        { code: 31, type: 889 } as CategoryParamsDto
      );

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getResourcesRequestCategoriesCategories() {
    try {
      const categories = await this.categoryRepository.findCategoryByAttributes(
        { code: 31, type: 888 } as CategoryParamsDto
      );

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
