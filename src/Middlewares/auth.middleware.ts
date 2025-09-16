import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.JWT_SECRET || "default_secret";

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // anexar o payload no request para usar em controllers/rotas
    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}


export default authMiddleware;
