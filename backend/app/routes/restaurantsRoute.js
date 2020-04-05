import express from 'express';

import { searchRestaurant } from '../controllers/restaurantsController';

const router = express.Router();

// restaurant Routes

router.post('/search', searchRestaurant);

export default router;