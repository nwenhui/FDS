import { handleErrors } from '../helpers';

function customerOrdersResults(data) {
    var results = [];
    data.forEach(result => results.push(result.orderid));
    return results;
}

function addressResults(data) {
    var results = [];
    data.forEach(result => results.push(result.addressdetails));
    return results;
}

function customerOrderItems(data) {
    var results = [];
    data.forEach(result => {
        const item = {
            itemid: result.itemid,
            qty: result.quantity
        }
        results.push(item)});
    return results;
}

function orderItemNames(data) {
    var results = [];
    data.forEach(result => {
        const item = {
            itemid: result.itemid,
            itemname: result.itemname
        }
        results.push(item)});
    return results;
}

function customerOrderCount(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
        // .then((response) => {
        //     response.json()
        //     .then((data) => {
        //         console.log('countdata: ', data.count);
        //         return data
        //     })
        // })
}

function customerOrders(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders/id';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function orderReceipt(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders/receipt';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function orderFood(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders/food';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function orderInformation(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders/information';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function orderRestaurant(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/orders/restaurant';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getRating(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/order/rating';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function rateDelivery(id, value) {
    const data = {id: id, value: value};
    const url = 'http://localhost:3000/api/v1/customer/order/rating/new';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function deleteRating(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/order/rating/remove';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function editRating(id, value) {
    const data = {id: id, value: value};
    const url = 'http://localhost:3000/api/v1/customer/order/rating/edit';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getRatingCount(id) {
    const data = {id: id };
    const url = 'http://localhost:3000/api/v1/customer/order/rating/count';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getOrderItemNames(id) {
    const data = {id: id };
    const url = 'http://localhost:3000/api/v1/customer/order/item/names';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getReview(orderid, itemid) {
    const data = {orderid: orderid, itemid: itemid};
    const url = 'http://localhost:3000/api/v1/customer/order/review';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function reviewItem(orderid, itemid, rating, review) {
    const data = {orderid: orderid, itemid: itemid, rating: rating, review: review};
    const url = 'http://localhost:3000/api/v1/customer/order/review/new';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function deleteReview(orderid, itemid) {
    const data = {orderid: orderid, itemid: itemid};
    const url = 'http://localhost:3000/api/v1/customer/order/review/remove';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function editReview(orderid, itemid, rating, review) {
    const data = {orderid: orderid, itemid: itemid, rating: rating, review: review};
    const url = 'http://localhost:3000/api/v1/customer/order/review/edit';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getReviewCount(orderid, itemid) {
    const data = { orderid: orderid, itemid: itemid };
    const url = 'http://localhost:3000/api/v1/customer/order/review/count';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getRecentAddress(id) {
    const data = { id: id };
    const url = 'http://localhost:3000/api/v1/customer/address';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}


export const customerService = {
    customerOrderCount,
    customerOrders,
    customerOrdersResults,
    orderReceipt,
    orderFood,
    customerOrderItems,
    orderInformation,
    orderRestaurant,
    getRating,
    rateDelivery,
    deleteRating,
    editRating,
    getRatingCount,
    getOrderItemNames,
    orderItemNames,
    getReview,
    reviewItem,
    deleteReview,
    editReview,
    getReviewCount,
    getRecentAddress,
    addressResults,
}