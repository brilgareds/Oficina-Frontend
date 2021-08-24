import { CategoryParamsDto } from "../category/dto/category.params";
import { CategoryRepository } from "../category/repositories/category.repository";
import { RrhhRepository } from "./repositories/rrhh.repository";

export class RrhhService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly rrhhRepository: RrhhRepository
  ) { }

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


  public async saveFormRRHH(data: {}) {
    
    try {
      return await this.rrhhRepository.saveFormRRHH(data);
    } catch (error) {
      throw new Error(error.message);
    }

  }


}
