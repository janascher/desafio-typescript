import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import { TeamController } from "../../controllers/teamController";
import { TeamServices } from "../../services/teams";
import { Repository } from "../../repositories";

const router = Router();
const repository = new Repository();
const teamServices = new TeamServices(repository);
const teamController = new TeamController(teamServices);

router.get('/', authenticate, teamController.findAllTeams);
router.get('/:team_id', authenticate, teamController.findTeam);

router.post('/', authenticate, teamController.createTeam);
router.post('/:team_id/member/:user_id', authenticate, teamController.addTeamMember);

router.patch('/:team_id', authenticate, teamController.updateTeam);

router.delete('/:team_id', authenticate, teamController.deleteTeam);
router.delete('/:team_id/member/:user_id', authenticate, teamController.deleteTeamMember);

export default router;