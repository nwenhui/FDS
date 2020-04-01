import express from 'express';

import { createCustomer, siginCustomer, searchCustomerFirstnameOrLastname } from '../controllers/customersController';

const router = express.Router();

// customer Routes

router.post('/auth/signup', createCustomer);
router.post('/auth/signin', siginCustomer);
router.get('/search', searchCustomerFirstnameOrLastname);

export default router;