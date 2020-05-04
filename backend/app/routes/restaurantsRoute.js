import express from 'express';

import { searchRestaurant, getRestaurant, createRestaurant, editRestaurant, deleteRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

// restaurant Routes

// router.post('/search', searchRestaurant);
router.get('/search', searchRestaurant)
router.post('/get', getRestaurant)
router.post('/auth/signup', createRestaurant)
router.post('/edit', editRestaurant)
router.post('/delete', deleteRestaurant)

export default router;