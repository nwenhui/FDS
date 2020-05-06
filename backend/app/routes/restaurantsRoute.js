import express from 'express';

import { searchRestaurant, getRestaurant, createRestaurant, editRestaurant, deleteRestaurant, getRestaurantMenu, getFood, getFoodAvailability, getPromotions, getPromotionInformation, getOngoingPromotions, getPastPromotions, createRestaurantPromotion, deletePromotion } from '../controllers/restaurantsController';

const router = express.Router();

// restaurant Routes

// router.post('/search', searchRestaurant);
router.get('/search', searchRestaurant)
router.post('/get', getRestaurant)
router.post('/auth/signup', createRestaurant)
router.post('/edit', editRestaurant)
router.post('/delete', deleteRestaurant)
router.get('/menu', getRestaurantMenu)
router.post('/food',getFood)
router.post('/food/availability', getFoodAvailability)
router.post('/promotions/all', getPromotions)
router.post('/promotions/info', getPromotionInformation)
router.post('/promotions/past', getPastPromotions)
router.post('/promotions/ongoing', getOngoingPromotions)
router.post('/promotions/new', createRestaurantPromotion)
router.post('/promotions/delete', deletePromotion)

export default router;