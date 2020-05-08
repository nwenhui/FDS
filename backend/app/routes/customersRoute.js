import express from 'express';

import { createCustomer, signinCustomer, searchCustomerFirstnameOrLastname, editCustomer, deleteCustomer, ordersByCustomer, applicablePromotions, promotionDetails, customerOrders, orderReceipt, orderInformation, orderFood, orderRestaurant, rateDelivery, deleteRating, getRating, editRating, getRatingCount, getOrderItemNames, 
    reviewItem,
    getReview,
    deleteReview,
    editReview,
    getReviewCount,
    getRecentAddress,
    newOrder
 } from '../controllers/customersController';

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
router.post('/order/item/names', getOrderItemNames),
router.post('/order/review', getReview);
router.post('/order/review/new', reviewItem)
router.post('/order/review/remove', deleteReview)
router.post('/order/review/edit', editReview)
router.post('/order/review/count', getReviewCount)
router.post('/address', getRecentAddress)
router.post('/order/new', newOrder)


export default router;