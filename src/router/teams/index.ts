import { Router } from "express";
import authenticate from "../../middlewares/authenticate";
import { TeamController } from "../../controllers/teamController";

const router = Router();
const teamController = new TeamController();

router.get('/', authenticate, teamController.findAllTeams);
router.get('/:team_id', authenticate, teamController.findTeam);

router.post('/', authenticate, teamController.createTeam);
router.post('/:team_id/member/:user_id', authenticate, teamController.addTeamMember);

router.patch('/:team_id', authenticate, teamController.updateTeam);

router.delete('/:team_id', authenticate, teamController.deleteTeam);
router.delete('/:team_id/member/:user_id', authenticate, teamController.deleteTeamMember);

export default router;