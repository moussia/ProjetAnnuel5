import { Router } from 'express';
const router = Router();

router.post('/game', validator.validateLaunch, visitor.launch);
router.post(
    '/game/:gameID/action',
    tokens.verifyToken,
    validator.validateAction,
    visitor.action
);
router.get('/leaderboard', visitor.leaderboard);
router.get('/', visitor.menu);
// router.use('*', visitor.notFound);

module.exports = router;