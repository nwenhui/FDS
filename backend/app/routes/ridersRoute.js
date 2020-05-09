import express from 'express';

import { createRider, signinRider, searchRiderFirstnameOrLastname, editRider, deleteRider, ordersByRider, getRiderType, entershift, getshifts, getrates } from '../controllers/ridersController';

const router = express.Router();

// rider Routes

router.post('/auth/signup', createRider);
router.post('/auth/signin', signinRider);
router.get('/search', searchRiderFirstnameOrLastname);
router.post('/edit', editRider);
router.post('/delete', deleteRider);
router.post('/orders', ordersByRider);
router.post('/type', getRiderType);
router.post('/shifts/new', entershift)
router.post('/shifts/get', getshifts)
router.post('/rates', getrates)

export default router;