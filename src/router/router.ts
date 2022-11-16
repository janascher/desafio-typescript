import { Router } from "express";
import userRoutes from "./users/index";
import teamRoutes from "./teams/index";
import authenticate from "../middlewares/authenticate";
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);

export default router;