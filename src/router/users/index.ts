import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import { UserController } from "../../controllers/userController";
import { UserServices } from "../../services/users";
import { Repository } from "../../repositories";
import { AuthenticatedUserDataRequest } from "../../models";

const router = Router();
const repository = new Repository();
const userServices = new UserServices(repository, 'usuario');
const userController = new UserController(userServices);

router.get('/', authenticate, (req, res) => userController.findAllUsers(req as AuthenticatedUserDataRequest, res));
router.get('/me', authenticate, (req, res) => userController.findMyUser(req as AuthenticatedUserDataRequest, res));
router.get('/:user_id', authenticate, (req, res) => userController.findUser(req as AuthenticatedUserDataRequest, res));

router.post('/', (req, res) => userController.createUser(req, res));

router.patch('/:user_id', authenticate, (req, res) => userController.updateUser(req as AuthenticatedUserDataRequest, res));

router.delete('/:user_id', authenticate, (req, res) => userController.deleteUser(req as AuthenticatedUserDataRequest, res));

export default router;