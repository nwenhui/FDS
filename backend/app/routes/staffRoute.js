import express from 'express';

import { createStaff, signinStaff, searchStaffFirstnameOrLastname, editStaff, deleteStaff, getOngoingPromotions, getPastPromotions, getPromotions, getPromotionInformation, createFDSPromotion, deletePromotion, editPromotion, getTopItems, getTopItemsWithin, getTotalCostWithin, getTotalOrderCountWithin } from '../controllers/staffController';

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
router.post('/summary/top', getTopItems)
router.post('/summary/topitem', getTopItemsWithin)
router.post('/summary/totalcost', getTotalCostWithin)
router.post('/summary/totalcount', getTotalOrderCountWithin)

export default router;