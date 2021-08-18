import { CategoryParamsDto } from "../dto/category.params";

export interface CategoryRepository {
  findCategoryByAttributes(categoryParams: CategoryParamsDto): Promise<any>;
}
