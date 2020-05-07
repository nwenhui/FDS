import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname, editCustomer, deleteCustomer, ordersByCustomer, applicablePromotions, promotionDetails, customerOrders, orderReceipt, orderInformation, orderFood, orderRestaurant } from '../controllers/customersController';

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

export default router;