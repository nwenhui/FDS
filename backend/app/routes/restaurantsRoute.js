import express from 'express';

import { searchRestaurant, getRestaurant, createRestaurant, editRestaurant, deleteRestaurant, getRestaurantMenu, getFood, getFoodAvailability, getPromotions, getPromotionInformation, getOngoingPromotions, getPastPromotions, createRestaurantPromotion, deletePromotion, getCategory, newFoodItem, deleteFood, getRestaurantFromFood, getRestaurantAvailables, searchAllFood, searchAvailableFood, getRestaurantName } from '../controllers/restaurantsController';

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
router.post('/food/category', getCategory)
router.post('/food/new', newFoodItem)
router.post('/food/delete', deleteFood)
router.post('/food/restaurant', getRestaurantFromFood)
router.post('/available', getRestaurantAvailables)
router.post('/search/all', searchAllFood)
router.post('/search/available', searchAvailableFood)
router.post('/name', getRestaurantName)

export default router;