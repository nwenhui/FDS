import { BehaviorSubject } from 'rxjs';
import { handleErrors, userType } from '../helpers';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
const currentUserTypeSubject = new BehaviorSubject(localStorage.getItem('currentUserType'));

const option = [
    { value: 1, label: 'FDS Manager' },
    { value: 2, label: 'Staff' },
    { value: 3, label: 'Rider' },
    { value: 4, label: 'Customer' }
];

function getLoginURL(type) {
    switch(type) {
        case option[0].value:
            return 'http://localhost:3000/api/v1/manager/auth/signin';
            break;
        case option[1].value:
            return 'http://localhost:3000/api/v1/staff/auth/signin';
            break;    
        case option[2].value:
            return 'http://localhost:3000/api/v1/rider/auth/signin';
            break;
        case option[3].value:
            return 'http://localhost:3000/api/v1/customer/auth/signin';
            break;  
    }
}

function getSignupURL(type) {
    switch(type) {
        case option[0].value:
            return 'http://localhost:3000/api/v1/manager/auth/signup';
            break;
        case option[1].value:
            return 'http://localhost:3000/api/v1/staff/auth/signup';
            break;    
        case option[2].value:
            return 'http://localhost:3000/api/v1/rider/auth/signup';
            break;
        case option[3].value:
            return 'http://localhost:3000/api/v1/customer/auth/signup';
            break;  
    }
}

function login(email, password, type) {
    const data = {email: email, password: password};
    const url = getLoginURL(type);

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("sign in donezo!!! :D");
                    currentUserSubject.next(data);
                    const current = currentUserSubject.value.data;
                    console.log('current: ', current.customerid);
                    localStorage.setItem('currentUser', data);
                    if (type === option[0].value) {
                        currentUserTypeSubject.next(userType.Manager);
                        localStorage.setItem('currentUserType', userType.Manager);
                    } else if (type === option[1].value) {
                        currentUserTypeSubject.next(userType.Staff);
                        localStorage.setItem('currentUserType', userType.Staff);
                    } else if (type === option[2].value) {
                        currentUserTypeSubject.next(userType.Rider);
                        localStorage.setItem('currentUserType', userType.Rider);
                    } else if (type === option[3].value) {
                        currentUserTypeSubject.next(userType.Customer);
                        localStorage.setItem('currentUserType', userType.Customer);
                    }
                    return data;
                })
        });
}

function signup(firstname, lastname, email, password, type) {
    const data = {first_name: firstname, last_name: lastname, email: email, password: password};
    const url = getSignupURL(type);

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("sign up donezo!!! :D");
                    currentUserSubject.next(data);
                    currentUserTypeSubject.next(userType.Staff);
                    localStorage.setItem('currentUserType', userType.Staff);
                    return data;
                })
        });
}

function staffSignup(firstname, lastname, email, password, resid) {
    const data = {first_name: firstname, last_name: lastname, email: email, password: password, resid: resid};
    const url = 'http://localhost:3000/api/v1/staff/auth/signup';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("sign up donezo!!! :D");
                    currentUserSubject.next(data);
                    currentUserTypeSubject.next(userType.Staff);
                    localStorage.setItem('currentUserType', userType.Staff);
                    return data;
                })
        });
}

function riderSignup(firstname, lastname, email, password, type) {
    const data = {first_name: firstname, last_name: lastname, email: email, password: password, type: type};
    const url = 'http://localhost:3000/api/v1/rider/auth/signup';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("sign up donezo!!! :D");
                    currentUserSubject.next(data);
                    currentUserTypeSubject.next(userType.Rider);
                    localStorage.setItem('currentUserType', userType.Rider);
                    return data;
                })
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

function restaurantSignup(name, min, address) {
    const data = {name: name, min: min, address: address};
    const url = 'http://localhost:3000/api/v1/restaurant/auth/signup';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .then((response) => {
            response.json()
                .then((data) => {
                    console.log("resty sign up donezo!!! :D");
                    return data;
                })
        });
}

export const authenticationService = {
    login,
    signup,
    logout,
    restaurantSignup,
    staffSignup,
    riderSignup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    currentUserType: currentUserTypeSubject.asObservable(),
    get currentUserTypeValue () { return currentUserTypeSubject.value }
}