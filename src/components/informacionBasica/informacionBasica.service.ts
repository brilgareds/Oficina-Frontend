import { InformacionBasicaDto } from "./dto/informacionBasica.dto";
import { InformacionBasicaRepository } from "./repositories/informacionBasica.repository";

export class InformacionBasicaService {
  constructor(private readonly informacionBasicaRepository: InformacionBasicaRepository) {}

  public async buscarMenu({ cedula,empresa }: InformacionBasicaDto) {
    try {
      const buscarDatos = await this.informacionBasicaRepository.buscarDatos(cedula, empresa);

      return buscarDatos;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
