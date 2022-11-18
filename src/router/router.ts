import { Router } from "express";
import userRoutes from "./users/index";
import teamRoutes from "./teams/index";
import authenticate from "../middlewares/authenticate";
import { AuthController } from '../controllers/authController';
import { AuthServices } from "../services/authenticate";
import { Repository } from "../repositories";

const router = Router();
const repository = new Repository();
const authServices = new AuthServices(repository, 'usuario');
const authController = new AuthController(authServices);

router.post('/login', (req, res) => authController.login(req, res));
router.post('/logout', authenticate, (req, res) => authController.logout(req, res));

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);

export default router;