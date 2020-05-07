import { handleErrors } from '../helpers';

function customerOrdersResults(data) {
    var results = [];
    data.forEach(result => results.push(result.orderid));
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

export const customerService = {
    customerOrderCount,
    customerOrders,
    customerOrdersResults,
    orderReceipt,
    orderFood,
    customerOrderItems,
    orderInformation,
    orderRestaurant,
}