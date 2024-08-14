import { Router } from 'express';
import { usuarioController } from '../controller/usuario.js';
import { token } from '../services/jwt.js';

export const router = Router();

router.get("/", token.verify, usuarioController.getTodos); 
router.post("/registrar", usuarioController.registrar);      
router.post("/login", usuarioController.login);       