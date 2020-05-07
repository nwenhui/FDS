import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname, editCustomer, deleteCustomer, ordersByCustomer, applicablePromotions, promotionDetails } from '../controllers/customersController';

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

export default router;