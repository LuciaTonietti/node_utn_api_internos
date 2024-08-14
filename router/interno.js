import { Router } from 'express';
import { internoController } from '../controller/interno.js';
import { token } from '../services/jwt.js';

export const router = Router();

router.get("/", internoController.getTodos);
router.get("/s", token.verify, internoController.getByNro); 
router.get("/:id", token.verify, internoController.getById); 
router.post("/", token.verify, internoController.create);
router.patch("/:id", token.verify, internoController.update);
router.delete("/:id", token.verify, internoController.delete);