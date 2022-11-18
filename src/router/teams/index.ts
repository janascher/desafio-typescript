import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import { TeamController } from "../../controllers/teamController";
import { TeamServices } from "../../services/teams";
import { Repository } from "../../repositories";
import { AuthenticatedUserDataRequest } from '../../models';

const router = Router();
const repository = new Repository();
const teamServices = new TeamServices(repository);
const teamController = new TeamController(teamServices);

router.get('/', authenticate, (req, res) => teamController.findAllTeams(req as AuthenticatedUserDataRequest, res));
router.get('/:team_id', authenticate, (req, res) => teamController.findTeam(req, res));

router.post('/', authenticate, (req, res) => teamController.createTeam(req, res));
router.post('/:team_id/member/:user_id', authenticate, (req, res) => teamController.addTeamMember(req, res));

router.patch('/:team_id', authenticate, (req, res) => teamController.updateTeam(req, res));

router.delete('/:team_id', authenticate, (req, res) => teamController.deleteTeam(req, res));
router.delete('/:team_id/member/:user_id', authenticate, (req, res) => teamController.deleteTeamMember(req as AuthenticatedUserDataRequest, res));

export default router;