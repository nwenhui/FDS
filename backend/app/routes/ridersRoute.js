import express from 'express';

import { createRider, signinRider, searchRiderFirstnameOrLastname } from '../controllers/ridersController';

const router = express.Router();

// rider Routes

router.post('/auth/signup', createRider);
router.post('/auth/signin', signinRider);
router.get('/search', searchRiderFirstnameOrLastname);

export default router;