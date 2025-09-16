import express from "express";
import * as AuthController from "../Controllers/auth.controller";
import authMiddleware from "../Middlewares/auth.middleware";


export const initialRoutes = express.Router();

initialRoutes.post("/login", AuthController.login);

initialRoutes.get("/private-route", authMiddleware, (req, res) => {
  res.json({ message: "Acesso autorizado", user: req.user });
});

