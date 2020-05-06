import express from 'express';

import { createRider, signinRider, searchRiderFirstnameOrLastname, editRider, deleteRider, ordersByRider, getRiderType } from '../controllers/ridersController';

const router = express.Router();

// rider Routes

router.post('/auth/signup', createRider);
router.post('/auth/signin', signinRider);
router.get('/search', searchRiderFirstnameOrLastname);
router.post('/edit', editRider);
router.post('/delete', deleteRider);
router.post('/orders', ordersByRider);
router.post('/type', getRiderType);

export default router;