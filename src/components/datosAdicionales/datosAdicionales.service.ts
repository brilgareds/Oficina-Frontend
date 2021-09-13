import { BuscarDatosDto } from "./dto/buscarDatos.dto";
import { ActualizarDatosAdicionalesDto } from "./dto/actualizarDatosAdicionales.dto";
import { DatosAdicionalesRepository } from "./repositories/datosAdicionales.repository";

export class DatosAdicionalesService {
  constructor(private readonly datosAdicionalesRepository: DatosAdicionalesRepository) {}

  public async buscarDatos({ CODIGO_EMPRESA,NRO_DOCUMENTO }: BuscarDatosDto) {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatos(CODIGO_EMPRESA, NRO_DOCUMENTO);

      let arrayDeudas = new Array();
      let arrayDeudasFuturas = new Array();
      let arrayIntereses =  new Array();
      if(buscarDatos[0]){
        if(buscarDatos[0]['DATOS_ADICIONALES_CODIGO']){
          const datosDeListas = await this.datosAdicionalesRepository.buscarDatosListaDatosAdicionales(
            buscarDatos[0]['DATOS_ADICIONALES_CODIGO']
          );
          if(datosDeListas.length > 0){
            for (const value of datosDeListas) {
              if(value['DEUDAS'] == 1) {
                arrayDeudas.push(value);
              }
              if(value['DEUDAS_FUTURAS'] == 1){
                arrayDeudasFuturas.push(value);
              }
              if(value['DEUDAS'] == 0 && value['DEUDAS_FUTURAS'] == 0){
                arrayIntereses.push(value);
              }
            }
          }
        }
        buscarDatos = {'buscarDatos':buscarDatos,'arrayDeudas':arrayDeudas,
                           'arrayDeudasFuturas':arrayDeudasFuturas,'arrayIntereses':arrayIntereses};
      }else{
        buscarDatos = {"error":"No se encontraron datos"};
      }

      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosFrecuencia() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosFrecuencia();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosVehiculos() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosVehiculos();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosLicenciaConduccion() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosLicenciaConduccion();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosCondicionEspecial() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosCondicionEspecial();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosBienesServicios() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosBienesServicios();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async buscarDatosTemasInteres() {
    try {

      let buscarDatos = await this.datosAdicionalesRepository.buscarDatosTemasInteres();

      if(!buscarDatos[0]){
        buscarDatos = {"error":"No se encontraron datos"};
      }
      return buscarDatos;

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

  public async actualizarRegistroDatosAdicionales({
    NRO_DOCUMENTO,
    CODIGO_EMPRESA,
    HOBBIES,
    PROFESION,
    ANOS_PROFESION,
    INGRESOS_ADICIONALES,
    MASCOTA, 
    CUAL_MASCOTA,
    RECREACION,
    CUAL_RECREACION,
    FRECUENCIA_RECREACION,
    DEPORTE,
    CUAL_DEPORTE,
    FRECUENCIA_DEPORTE,
    OTRO_TRABAJO,
    CUAL_OTRO_TRABAJO,
    FRECUENCIA_OTRO_TRABAJO,
    VEHICULO,
    CUAL_VEHICULO,
    LICENCIA_CONDUCCION,
    LICENCIA_CONDUCCION_TIPO,
    GRUPO_SOCIAL,
    CUAL_GRUPO_SOCIAL,
    AHORRO,
    PORCENTAJE_AHORRO_SALARIAL,
    DESTINO_AHORROS,
    INTERES_OTRO,
    CONVENIOS_ADICIONALES,
    DEPORTES_INTERES,
    arrayCondicionEspecial,
    arrayDeudas,
    arrayDeudasFuturas,
    arrayTemasInteres
  }: ActualizarDatosAdicionalesDto) {
    try {

      let actualizarRegistro = await this.datosAdicionalesRepository.existeRegistroDatosAdicionales(CODIGO_EMPRESA,NRO_DOCUMENTO);

      const HOBBIES_string = (HOBBIES)?"'"+HOBBIES+"'":"NULL";
      const PROFESION_string = (PROFESION)?"'"+PROFESION+"'":"NULL";
      const ANOS_PROFESION_string = (ANOS_PROFESION || RECREACION==0)?ANOS_PROFESION+"":"NULL";
      const INGRESOS_ADICIONALES_string = (INGRESOS_ADICIONALES)?INGRESOS_ADICIONALES+"":"NULL";
      const MASCOTA_string = (MASCOTA || MASCOTA==0)?MASCOTA+"":"NULL";
      const CUAL_MASCOTA_string = (CUAL_MASCOTA)?"'"+CUAL_MASCOTA+"'":"NULL";
      const RECREACION_string = (RECREACION || RECREACION==0)?RECREACION+"":"NULL";
      const CUAL_RECREACION_string = (CUAL_RECREACION)?"'"+CUAL_RECREACION+"'":"NULL";
      const FRECUENCIA_RECREACION_string = (FRECUENCIA_RECREACION)?"'"+FRECUENCIA_RECREACION+"'":"NULL";
      const DEPORTE_string = (DEPORTE || DEPORTE==0)?DEPORTE+"":"NULL";
      const CUAL_DEPORTE_string = (CUAL_DEPORTE)?"'"+CUAL_DEPORTE+"'":"NULL";
      const FRECUENCIA_DEPORTE_string = (FRECUENCIA_DEPORTE)?"'"+FRECUENCIA_DEPORTE+"'":"NULL";
      const OTRO_TRABAJO_string = (OTRO_TRABAJO || OTRO_TRABAJO==0)?OTRO_TRABAJO+"":"NULL";
      const CUAL_OTRO_TRABAJO_string = (CUAL_OTRO_TRABAJO)?"'"+CUAL_OTRO_TRABAJO+"'":"NULL";
      const FRECUENCIA_OTRO_TRABAJO_string = (FRECUENCIA_OTRO_TRABAJO)?"'"+FRECUENCIA_OTRO_TRABAJO+"'":"NULL";
      const VEHICULO_string = (VEHICULO || VEHICULO==0)?VEHICULO+"":"NULL";
      const CUAL_VEHICULO_string = (CUAL_VEHICULO)?"'"+CUAL_VEHICULO+"'":"NULL";
      const LICENCIA_CONDUCCION_string = (LICENCIA_CONDUCCION || LICENCIA_CONDUCCION==0)?LICENCIA_CONDUCCION+"":"NULL";
      const LICENCIA_CONDUCCION_TIPO_string = (LICENCIA_CONDUCCION_TIPO)?"'"+LICENCIA_CONDUCCION_TIPO+"'":"NULL";
      const GRUPO_SOCIAL_string = (GRUPO_SOCIAL || GRUPO_SOCIAL==0)?GRUPO_SOCIAL+"":"NULL";
      const CUAL_GRUPO_SOCIAL_string = (CUAL_GRUPO_SOCIAL)?"'"+CUAL_GRUPO_SOCIAL+"'":"NULL";
      const AHORRO_string = (AHORRO || AHORRO==0)?AHORRO+"":"NULL";
      const PORCENTAJE_AHORRO_SALARIAL_string = (PORCENTAJE_AHORRO_SALARIAL || PORCENTAJE_AHORRO_SALARIAL==0)?PORCENTAJE_AHORRO_SALARIAL+"":"NULL";
      const DESTINO_AHORROS_string = (DESTINO_AHORROS)?"'"+DESTINO_AHORROS+"'":"NULL";
      const INTERES_OTRO_string = (INTERES_OTRO)?"'"+INTERES_OTRO+"'":"NULL";
      const CONVENIOS_ADICIONALES_string = (CONVENIOS_ADICIONALES)?"'"+CONVENIOS_ADICIONALES+"'":"NULL";
      const DEPORTES_INTERES_string = (DEPORTES_INTERES)?"'"+DEPORTES_INTERES+"'":"NULL";

      if(!actualizarRegistro[0]['DATOS_ADICIONALES_CODIGO']){

        actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroDatosAdicionales(
          NRO_DOCUMENTO,
          CODIGO_EMPRESA,
          HOBBIES_string,
          PROFESION_string,
          ANOS_PROFESION_string,
          INGRESOS_ADICIONALES_string,
          MASCOTA_string, 
          CUAL_MASCOTA_string,
          RECREACION_string,
          CUAL_RECREACION_string,
          FRECUENCIA_RECREACION_string,
          DEPORTE_string,
          CUAL_DEPORTE_string,
          FRECUENCIA_DEPORTE_string,
          OTRO_TRABAJO_string,
          CUAL_OTRO_TRABAJO_string,
          FRECUENCIA_OTRO_TRABAJO_string,
          VEHICULO_string,
          CUAL_VEHICULO_string,
          LICENCIA_CONDUCCION_string,
          LICENCIA_CONDUCCION_TIPO_string,
          GRUPO_SOCIAL_string,
          CUAL_GRUPO_SOCIAL_string,
          AHORRO_string,
          PORCENTAJE_AHORRO_SALARIAL_string,
          DESTINO_AHORROS_string,
          INTERES_OTRO_string,
          CONVENIOS_ADICIONALES_string,
          DEPORTES_INTERES_string
        );

        let idRegistro = await this.datosAdicionalesRepository.consultarIdUltimoRegistro("ESMAD_DATOS_ADICIONALES");
        actualizarRegistro = await this.datosAdicionalesRepository.existeRegistroListaDatosAdicionales(idRegistro[0]['CODIGO']);
        let existenRegistros = (actualizarRegistro)?true:false;
        
        if(arrayCondicionEspecial.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaCondicionEspecial(idRegistro[0]['CODIGO']);
          }
          for (const value of arrayCondicionEspecial) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro[0]['CODIGO'],value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro[0]['CODIGO'],
                  value,
                  1,
                  0,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro[0]['CODIGO'],
                value,
                1,
                0,
                0,
                1
              );
            }
          }
        }

        if(arrayDeudas.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaDeudas(idRegistro[0]['CODIGO']);
          }
          for (const value of arrayDeudas) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro[0]['CODIGO'],value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro[0]['CODIGO'],
                  value,
                  0,
                  1,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro[0]['CODIGO'],
                value,
                0,
                1,
                0,
                1
              );
            }
          }
        }

        if(arrayDeudasFuturas.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaDeudasFuturas(idRegistro[0]['CODIGO']);
          }
          for (const value of arrayDeudasFuturas) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro[0]['CODIGO'],value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro[0]['CODIGO'],
                  value,
                  0,
                  0,
                  1,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro[0]['CODIGO'],
                value,
                0,
                0,
                1,
                1
              );
            }
          }
        }

        if(arrayTemasInteres.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaTemasInteres(idRegistro[0]['CODIGO']);
          }
          for (const value of arrayTemasInteres) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro[0]['CODIGO'],value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro[0]['CODIGO'],
                  value,
                  0,
                  0,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro[0]['CODIGO'],
                value,
                0,
                0,
                0,
                1
              );
            }
          }
        }

      }else{

        const idRegistro = actualizarRegistro[0]['DATOS_ADICIONALES_CODIGO'];
        actualizarRegistro = await this.datosAdicionalesRepository.actualizarRegistroDatosAdicionales(
          idRegistro,
          HOBBIES_string,
          PROFESION_string,
          ANOS_PROFESION_string,
          INGRESOS_ADICIONALES_string,
          MASCOTA_string, 
          CUAL_MASCOTA_string,
          RECREACION_string,
          CUAL_RECREACION_string,
          FRECUENCIA_RECREACION_string,
          DEPORTE_string,
          CUAL_DEPORTE_string,
          FRECUENCIA_DEPORTE_string,
          OTRO_TRABAJO_string,
          CUAL_OTRO_TRABAJO_string,
          FRECUENCIA_OTRO_TRABAJO_string,
          VEHICULO_string,
          CUAL_VEHICULO_string,
          LICENCIA_CONDUCCION_string,
          LICENCIA_CONDUCCION_TIPO_string,
          GRUPO_SOCIAL_string,
          CUAL_GRUPO_SOCIAL_string,
          AHORRO_string,
          PORCENTAJE_AHORRO_SALARIAL_string,
          DESTINO_AHORROS_string,
          INTERES_OTRO_string,
          CONVENIOS_ADICIONALES_string,
          DEPORTES_INTERES_string
        );

        actualizarRegistro = await this.datosAdicionalesRepository.existeRegistroListaDatosAdicionales(idRegistro);
        let existenRegistros = (actualizarRegistro)?true:false;
        
        if(arrayCondicionEspecial.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaCondicionEspecial(idRegistro);
          }
          for (const value of arrayCondicionEspecial) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro,value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro,
                  value,
                  1,
                  0,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro,
                value,
                1,
                0,
                0,
                1
              );
            }
          }
        }

        if(arrayDeudas.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaDeudas(idRegistro);
          }
          for (const value of arrayDeudas) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro,value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro,
                  value,
                  0,
                  1,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro,
                value,
                0,
                1,
                0,
                1
              );
            }
          }
        }

        if(arrayDeudasFuturas.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaDeudasFuturas(idRegistro);
          }
          for (const value of arrayDeudasFuturas) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro,value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro,
                  value,
                  0,
                  0,
                  1,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro,
                value,
                0,
                0,
                1,
                1
              );
            }
          }
        }

        if(arrayTemasInteres.length>0){
          if(existenRegistros){
            actualizarRegistro = await this.datosAdicionalesRepository.desactivarListaTemasInteres(idRegistro);
          }
          for (const value of arrayTemasInteres) {
            if(existenRegistros){
              actualizarRegistro = await this.datosAdicionalesRepository.buscarRegistroListaDatosAdicionales(idRegistro,value);
              if(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']){
                actualizarRegistro = await this.datosAdicionalesRepository.activarListaDatosAdicionales(actualizarRegistro[0]['LISTA_DATOS_ADICIONALES_CODIGO']);
              }else{
                actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                  idRegistro,
                  value,
                  0,
                  0,
                  0,
                  1
                );
              }
            }else{
              actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroListaDatosAdicionales(
                idRegistro,
                value,
                0,
                0,
                0,
                1
              );
            }
          }
        }

      }

      actualizarRegistro = await this.datosAdicionalesRepository.existeRegistroDatosAdicionalesKactus(CODIGO_EMPRESA,NRO_DOCUMENTO);
      let CONDICION_ESPECIAL = "NULL";
      let CONDICION_ESPECIAL_LGTB = "'N'";
      console.log("array: ",arrayCondicionEspecial);
      
      if(arrayCondicionEspecial.length>0){
        for (const value of arrayCondicionEspecial) {
          let sigla = await this.datosAdicionalesRepository.buscarValorTipo(value);
          if(value == 1453){
            CONDICION_ESPECIAL_LGTB = "'"+sigla[0]['TIP_ATRIBUTO1']+"'";
          }else if(CONDICION_ESPECIAL == "NULL"){
            CONDICION_ESPECIAL = "'"+sigla[0]['TIP_ATRIBUTO1']+"'";
          }
        }
      }

      if(!actualizarRegistro[0]['cod_empr'] && !actualizarRegistro[0]['cod_empl']){
        const USU_creacion = ((NRO_DOCUMENTO+"").length>8)?(NRO_DOCUMENTO+"").substring(0, 8):NRO_DOCUMENTO+"";
        const dateAct_hora = new Date(Date.now());
        const act_hora = dateAct_hora.toISOString().split('T')[0];
        actualizarRegistro = await this.datosAdicionalesRepository.crearRegistroDatosAdicionalesKactus(
          CODIGO_EMPRESA,
          NRO_DOCUMENTO,
          HOBBIES_string,
          PROFESION_string,
          ANOS_PROFESION_string,
          CUAL_MASCOTA_string,
          CUAL_RECREACION_string,
          FRECUENCIA_RECREACION_string,
          CUAL_DEPORTE_string,
          FRECUENCIA_DEPORTE_string,
          CUAL_OTRO_TRABAJO_string,
          FRECUENCIA_OTRO_TRABAJO_string,
          CUAL_VEHICULO_string,
          LICENCIA_CONDUCCION_TIPO_string,
          CUAL_GRUPO_SOCIAL_string,
          CONDICION_ESPECIAL,
          CONDICION_ESPECIAL_LGTB,
          USU_creacion,
          act_hora
        );
      }else{
        actualizarRegistro = await this.datosAdicionalesRepository.actualizarRegistroDatosAdicionalesKactus(
          CODIGO_EMPRESA,
          NRO_DOCUMENTO,
          HOBBIES_string,
          PROFESION_string,
          ANOS_PROFESION_string,
          CUAL_MASCOTA_string,
          CUAL_RECREACION_string,
          FRECUENCIA_RECREACION_string,
          CUAL_DEPORTE_string,
          FRECUENCIA_DEPORTE_string,
          CUAL_OTRO_TRABAJO_string,
          FRECUENCIA_OTRO_TRABAJO_string,
          CUAL_VEHICULO_string,
          LICENCIA_CONDUCCION_TIPO_string,
          CUAL_GRUPO_SOCIAL_string,
          CONDICION_ESPECIAL,
          CONDICION_ESPECIAL_LGTB
        );
      }

      return {"ok":"Se actualizo el registro correctamente"};

    } catch (error) {
      console.log("error: ",error.message);
      throw new Error("No se pudo realizar el proceso");
    }
  }

}
