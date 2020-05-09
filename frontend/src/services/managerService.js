import { handleErrors } from '../helpers';


function newrestaurantcount(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/restaurant/count';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function newcustomercount(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/customer/count';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}


function orderscount(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/orders/count';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function totalfoodcost(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/orders/foodcost';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function totalnett(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/orders/nett';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function locations(start,end) {
    const data = {start: start, end: end};
    const url = 'http://localhost:3000/api/v1/manager/summary/locations';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function locationsresults(data) {
    var results = [];
    data.forEach(result => results.push(result.addressdetails));
    console.log('results:' , results)
    return results;
}

function locationsperhr(start,end, starttime, endtime, location) {
    const data = {start: start, end: end, starttime: starttime, endtime: endtime, location: location};
    const url = 'http://localhost:3000/api/v1/manager/summary/locations/hr';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function customerorderscount(start,end, id) {
    const data = {start: start, end: end, id: id};
    const url = 'http://localhost:3000/api/v1/manager/summary/customer/orders';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function customertotalfoodcost(start,end,id) {
    const data = {start: start, end: end, id: id};
    const url = 'http://localhost:3000/api/v1/manager/summary/customer/foodcost';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function customertotalnett(start,end, id) {
    const data = {start: start, end: end, id: id};
    const url = 'http://localhost:3000/api/v1/manager/summary/customer/nett';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function checkcustomerid(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/manager/check/customer';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

export const managerService = {
    newrestaurantcount,
    newcustomercount,
    orderscount,
    totalfoodcost,
    totalnett,
    locations,
    locationsperhr,
    locationsresults,
    customerorderscount,
    customertotalfoodcost,
    customertotalnett,
    checkcustomerid
}