import { DocumentTypeRepository } from "./repositories/documentType.repository";

export class DocumentTypeService {
  constructor(private readonly documentTypeRepository: DocumentTypeRepository) {}

  public async getDocumentType() {
    try {
      return await this.documentTypeRepository.getDocumentType();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
