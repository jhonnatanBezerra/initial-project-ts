import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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

  const secret = process.env.JWT_SECRET || "default_secret";

  const token = jwt.sign(
    { id: "1", email },
    secret,
    { expiresIn: "1h" }
  );

  return res.json({ token });
}