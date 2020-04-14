import express from 'express';

import { searchRestaurant, getRestaurant, createRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

// restaurant Routes

// router.post('/search', searchRestaurant);
router.get('/search', searchRestaurant)
router.post('/get', getRestaurant)
router.post('/auth/signup', createRestaurant)

export default router;