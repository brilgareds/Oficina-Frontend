import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class FamiliarCrearDto {
  
  @IsNotEmpty()
  @IsNumber()
  COD_EMPL: number;
  
  @IsNotEmpty()
  @IsNumber()
  COD_EMPR: number; 

  @IsNotEmpty()
  @IsString()
  TIP_IDEN: string;

  @IsNotEmpty()
  @IsNumber()
  COD_FAMI: number; 

  @IsNotEmpty()
  @IsString()
  NOM_FAMI: string; 

  @IsNotEmpty()
  @IsString()
  APE_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TIP_RELA: string;

  @IsNotEmpty()
  @IsString()
  SEX_FAMI: string;
  
  @IsNotEmpty()
  @IsString()
  FEC_NACI: string;
  
  @IsNotEmpty()
  @IsString()
  EST_VIDA: string;
  
  @IsNotEmpty()
  @IsString()
  FAM_DEPE: string; 

  @IsNotEmpty()
  @IsString()
  EST_DISC: string; 

  @IsNotEmpty()
  @IsNumber()
  TIP_DISC: number;
  
  @IsNotEmpty()
  @IsString()
  CONTACTO_EMER: string;
  
  @IsNotEmpty()
  @IsString()
  FAMILIAR_IN_HOME: string;

  @IsNotEmpty()
  @IsNumber()
  MPI_FAMI: number; 

  @IsNotEmpty()
  @IsString()
  DIR_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TEL_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TRA_ESTU: string;

  @IsNotEmpty()
  @IsString()
  GRA_ESCO: string;
  
  @IsNotEmpty()
  @IsString()
  BEN_CACO: string;
  
  @IsNotEmpty()
  @IsString()
  BEN_EEPS: string;

  @IsNotEmpty()
  @IsString()
  PARTICIPAR_ACTIV: string;

  @IsNotEmpty()
  @IsString()
  HOB_FAMI: string;

  @IsNotEmpty()
  @IsNumber()
  PAI_FAMI: number; 

  @IsNotEmpty()
  @IsNumber()
  DTO_FAMI: number; 
  
}

export class ConsultarFamiliares {
  
  @IsNotEmpty()
  @IsNumber()
  COD_EMPL: number;
  
  @IsNotEmpty()
  @IsNumber()
  COD_EMPR: number; 
}

export class ActualizarFamiliar{

  
  @IsNotEmpty()
  @IsString()
  TIP_IDEN: string;

  @IsNotEmpty()
  @IsNumber()
  COD_FAMI: number; 

  @IsNotEmpty()
  @IsString()
  NOM_FAMI: string; 

  @IsNotEmpty()
  @IsString()
  APE_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TIP_RELA: string;

  @IsNotEmpty()
  @IsString()
  SEX_FAMI: string;
  
  @IsNotEmpty()
  @IsString()
  FEC_NACI: string;
  
  @IsNotEmpty()
  @IsString()
  EST_VIDA: string;
  
  @IsNotEmpty()
  @IsString()
  FAM_DEPE: string; 

  @IsNotEmpty()
  @IsString()
  EST_DISC: string; 

  @IsNotEmpty()
  @IsNumber()
  TIP_DISC: number;
  
  @IsNotEmpty()
  @IsString()
  CONTACTO_EMER: string;
  
  @IsNotEmpty()
  @IsString()
  FAMILIAR_IN_HOME: string;

  @IsNotEmpty()
  @IsNumber()
  MPI_FAMI: number; 

  @IsNotEmpty()
  @IsString()
  DIR_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TEL_FAMI: string;

  @IsNotEmpty()
  @IsString()
  TRA_ESTU: string;

  @IsNotEmpty()
  @IsString()
  GRA_ESCO: string;
  
  @IsNotEmpty()
  @IsString()
  BEN_CACO: string;
  
  @IsNotEmpty()
  @IsString()
  BEN_EEPS: string;

  @IsNotEmpty()
  @IsString()
  PARTICIPAR_ACTIV: string;

  @IsNotEmpty()
  @IsString()
  HOB_FAMI: string;

  @IsNotEmpty()
  @IsNumber()
  PAI_FAMI: number; 

  @IsNotEmpty()
  @IsNumber()
  DTO_FAMI: number;
}