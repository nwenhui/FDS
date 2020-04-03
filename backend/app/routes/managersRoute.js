import express from 'express';

import { createManager, signinManager, searchManagerFirstnameOrLastname } from '../controllers/managersController';

const router = express.Router();

// manager Routes

router.post('/auth/signup', createManager);
router.post('/auth/signin', signinManager);
router.get('/search', searchManagerFirstnameOrLastname);

export default router;