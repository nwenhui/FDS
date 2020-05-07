import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname, editCustomer, deleteCustomer, ordersByCustomer, applicablePromotions, promotionDetails, customerOrders, orderReceipt, orderInformation, orderFood, orderRestaurant, rateDelivery, deleteRating, getRating, editRating, getRatingCount } from '../controllers/customersController';

const router = express.Router();

// customer Routes

router.post('/auth/signup', createCustomer);
router.post('/auth/signin', signinCustomer);
router.get('/search', searchCustomerFirstnameOrLastname);
router.post('/edit', editCustomer);
router.post('/delete', deleteCustomer);
router.post('/orders', ordersByCustomer);
router.post('/orders/promotions', applicablePromotions);
router.post('/orders/promotions/details', promotionDetails);
router.post('/orders/id', customerOrders)
router.post('/orders/receipt', orderReceipt)
router.post('/orders/information', orderInformation)
router.post('/orders/food', orderFood)
router.post('/orders/restaurant', orderRestaurant)
router.post('/order/rating', getRating);
router.post('/order/rating/new', rateDelivery)
router.post('/order/rating/remove', deleteRating)
router.post('/order/rating/edit', editRating)
router.post('/order/rating/count', getRatingCount)


export default router;