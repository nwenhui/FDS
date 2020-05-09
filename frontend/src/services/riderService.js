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

function enterftshift(id, date, index) {
    if (index === 0) {
        this.entershift(id, date, " 10:00", " 14:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
        this.enterftshift(id, date, " 15:00", " 19:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
    }
    if (index === 1) {
        this.entershift(id, date, " 11:00", " 15:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
        this.enterftshift(id, date, " 16:00", " 20:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
    }
    if (index === 2) {
        this.entershift(id, date, " 12:00", " 16:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
        this.enterftshift(id, date, " 17:00", " 21:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
    }
    if (index === 3) {
        this.entershift(id, date, " 13:00", " 17:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
        this.enterftshift(id, date, " 18:00", " 22:00").then((response) => {
            response.json((data) => {
                console.log('donezo')
            })
        });
    }
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
    enterftshift,
    currentSubmit: currentSubmitSubject.asObservable(),
    get currentSubmitValue () { return currentSubmitSubject.value },
    
}