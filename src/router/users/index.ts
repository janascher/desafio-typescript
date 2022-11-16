import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import { UserController } from "../../controllers/userController";

const router = Router();
const userController = new UserController();

router.get('/', authenticate, userController.findAllUsers);
router.get('/me', authenticate, userController.findMyUser);
router.get('/:user_id', authenticate, userController.findUser);

router.post('/', userController.createUser);

router.patch('/:user_id', authenticate, userController.updateUser);

router.delete('/:user_id', authenticate, userController.deleteUser);

export default router;