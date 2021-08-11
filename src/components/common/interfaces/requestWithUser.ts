import { Request } from "express";

export default interface RequestWithUser extends Request {
  user: {
    name: string;
    last_name: string;
    identification: number;
    status: string;
  };
}
