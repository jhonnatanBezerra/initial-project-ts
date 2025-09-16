import { Router, Request, Response } from 'express';
import { initialRoutes } from './initial.routes';

export const routes = Router();

routes.use(initialRoutes);
