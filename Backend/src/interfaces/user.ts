import { Request } from "express";

export interface User {
  name: string;
  email: string;
  
 
}

export interface LoginUser extends Request {
  email: string;
  password: string;
}
