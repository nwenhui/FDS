import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname, editCustomer, deleteCustomer } from '../controllers/customersController';

const router = express.Router();

// customer Routes

router.post('/auth/signup', createCustomer);
router.post('/auth/signin', signinCustomer);
router.get('/search', searchCustomerFirstnameOrLastname);
router.post('/edit', editCustomer);
router.post('/delete', deleteCustomer);

export default router;