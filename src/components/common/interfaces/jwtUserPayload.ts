export interface JwtUserPayload {
  name: string;
  last_name: string;
  identification: number;
  status: string;
  externo?: boolean;
  company: string;
}
