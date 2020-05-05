import express from 'express';

import { createStaff, signinStaff, searchStaffFirstnameOrLastname, editStaff, deleteStaff } from '../controllers/staffController';

const router = express.Router();

// staff Routes

router.post('/auth/signup', createStaff);
router.post('/auth/signin', signinStaff);
router.get('/search', searchStaffFirstnameOrLastname);
router.post('/edit', editStaff);
router.post('/delete', deleteStaff);

export default router;