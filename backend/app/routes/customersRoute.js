import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname } from '../controllers/customersController';

const router = express.Router();

// customer Routes

router.post('/auth/signup', createCustomer);
router.post('/auth/signin', signinCustomer);
router.get('/search', searchCustomerFirstnameOrLastname);

export default router;