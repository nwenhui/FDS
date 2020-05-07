import express from 'express';

import { createStaff, signinStaff, searchStaffFirstnameOrLastname, editStaff, deleteStaff, getOngoingPromotions, getPastPromotions, getPromotions, getPromotionInformation, createFDSPromotion, deletePromotion, editPromotion } from '../controllers/staffController';

const router = express.Router();

// staff Routes

router.post('/auth/signup', createStaff);
router.post('/auth/signin', signinStaff);
router.get('/search', searchStaffFirstnameOrLastname);
router.post('/edit', editStaff);
router.post('/delete', deleteStaff);
router.post('/promotions/all', getPromotions)
router.post('/promotions/info', getPromotionInformation)
router.post('/promotions/past', getPastPromotions)
router.post('/promotions/ongoing', getOngoingPromotions)
router.post('/promotions/new', createFDSPromotion)
router.post('/promotions/delete', deletePromotion)
router.post('/promotion/edit', editPromotion)

export default router;