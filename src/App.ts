import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { routes } from './Routes';



export const app = express();

app.use(cors({
  /**
   *  Permitir todas as origens (ajuste conforme necessário)
   *  Em produção, é recomendável especificar as origens permitidas
   *  Exemplo: origin: process.env.ALLOWED_ORIGINS.split(',')
   */
  origin: '*',
}));
app.use(express.json());
app.use(cookieParser());

app.use(routes);