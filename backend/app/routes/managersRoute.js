import express from 'express';

import { createManager, signinManager, searchManagerFirstnameOrLastname, editManager, deleteManager } from '../controllers/managersController';

const router = express.Router();

// manager Routes

router.post('/auth/signup', createManager);
router.post('/auth/signin', signinManager);
router.get('/search', searchManagerFirstnameOrLastname);
router.post('/edit', editManager);
router.post('/delete', deleteManager);

export default router;