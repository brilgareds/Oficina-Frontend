declare namespace Express {
  export interface Request {
    user?: {
      name: string;
      last_name: string;
      identification: number;
      status: string;
      externo?: boolean;
      company: string;
    };
  }
}
