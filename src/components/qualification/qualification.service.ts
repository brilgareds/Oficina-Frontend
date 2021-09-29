import { QualificationRepository } from "./repositories/qualification.repository";
import { CrearRegistroSaludDto } from "./dto/saveQualification.dto";
import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../../.env`,
});

export class QualificationService {
  constructor(private readonly qualificationRepository: QualificationRepository) {}

  public async crearRegistroQualification({ OVT_CEDULA,sendNotification,input_add,CALIFICACION }:CrearRegistroSaludDto) {
    try {
      
      let findUserData = await this.qualificationRepository.consultarDatosUsuario(OVT_CEDULA);
      if(findUserData[0]){

        findUserData = findUserData[0];
        if(typeof input_add == 'number'){
          findUserData['tel_movi'] = input_add;
        }else{
          findUserData['eee_mail'] = input_add;
        }

        let OVT_MEDIO_SOLICITUD = 'NULL';
        let OVT_RESPUESTA_ALTERNA = 'NULL';
        
        if(sendNotification == "W"){
          OVT_RESPUESTA_ALTERNA = sendNotification;
        }else{
          OVT_MEDIO_SOLICITUD = sendNotification;
        }

        const saveQualification = await this.qualificationRepository.crearRegistroQualification(
          OVT_CEDULA,
          findUserData['nom_empl']+" "+findUserData['ape_empl'],
          findUserData['eee_mail'],
          findUserData['tel_movi'],
          findUserData['cod_empr'],
          findUserData['cod_ccos'],
          OVT_MEDIO_SOLICITUD,
          OVT_RESPUESTA_ALTERNA,
          CALIFICACION
        );
    }else{
      return {error: "No se ha podido consultar los datos"};
    }

    return {ok: "Se ha registrado exitosamente la calificación"};

    } catch (error: any) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

}
