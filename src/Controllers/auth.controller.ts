import { Request, Response } from "express";
import jwt from "jsonwebtoken";



const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export function login(req: Request, res: Response) {
  const { email, password } = req.body;

  /**
   * Aqui você validaria as credenciais do usuário, por exemplo, consultando um banco de dados.
   * Para simplificação, vamos assumir que as credenciais são válidas se:
   * email for "admin@teste.com" e a senha for "123456"
   */
  if (email !== "admin@teste.com" || password !== "123456") {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }


  const accessToken = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
  const refreshToken = jwt.sign({ userId: 1 }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXP });

  const serializedUser = {
    id: 1,
    email: "admin@teste.com",
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return res.json({ user: serializedUser, accessToken });
}