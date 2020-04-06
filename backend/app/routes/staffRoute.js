import express from 'express';

import { createStaff, signinStaff, searchStaffFirstnameOrLastname } from '../controllers/staffController';

const router = express.Router();

// staff Routes

router.post('/auth/signup', createStaff);
router.post('/auth/signin', signinStaff);
router.get('/search', searchStaffFirstnameOrLastname);

export default router;