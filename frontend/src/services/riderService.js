import { handleErrors } from '../helpers';
import { BehaviorSubject } from "rxjs";

const currentSubmitSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentSubmit") || "true")
  );

function riderOrderCount(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/rider/orders';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function riderType(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/rider/type';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function entershift(id, date, starttime, endtime) {
    const start = date.concat(starttime)
    const end = date.concat(endtime)
    const data = {id: id, start: start, end: end};
    const url = 'http://localhost:3000/api/v1/rider/shifts/new';
    currentSubmitSubject.next(false);
    localStorage.setItem("currentSubmit", JSON.stringify(false));

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getshifts(id, date) {
    const data = {id: id, date: date};
    console.log(data)
    const url = 'http://localhost:3000/api/v1/rider/shifts/get';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getrates(id) {
    const data = {id: id};
    console.log(data)
    const url = 'http://localhost:3000/api/v1/rider/rates';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

function getlatestshift(id) {
    const data = {id: id};
    console.log(data)
    const url = 'http://localhost:3000/api/v1/rider/shifts/latest';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request) 
        .then(handleErrors)
}

const setsubmit = () => {
    currentSubmitSubject.next(false);
    localStorage.setItem("currentSubmit", JSON.stringify(false));
}



export const riderService = {
    riderOrderCount,
    entershift,
    getshifts,
    getrates,
    getlatestshift,
    setsubmit,
    currentSubmit: currentSubmitSubject.asObservable(),
    get currentSubmitValue () { return currentSubmitSubject.value },
    
}