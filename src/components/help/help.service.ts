import { CategoryParamsDto } from "../category/dto/category.params";
import { CategoryRepository } from "../category/repositories/category.repository";
import { SendAlertEmailRepository } from "../sendAlertEmail/repositories/sendAlertEmail.repository";
import { HelpRepository } from "./repositories/help.repository";

export class HelpService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly helpRepository: HelpRepository
  ) { }

  public async requestsHelpCategory() {
    try {
      const categories = await this.categoryRepository.findHelpCategory();

      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async saveFormHelp(data: {}) {
    
    try {
      return await this.helpRepository.saveFormHelp(data);
    } catch (error) {
      throw new Error(error.message);
    }

  }

}
