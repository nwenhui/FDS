import { BehaviorSubject } from "rxjs";
import { handleErrors, userType } from "../helpers";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const currentUserTypeSubject = new BehaviorSubject(
  localStorage.getItem("currentUserType")
);
const currentResidSubject = new BehaviorSubject(
  localStorage.getItem("currentResis")
);


const option = [
  { value: 1, label: "FDS Manager" },
  { value: 2, label: "Staff" },
  { value: 3, label: "Rider" },
  { value: 4, label: "Customer" },
];

function getLoginURL(type) {
  switch (type) {
    case option[0].value:
      return "http://localhost:3000/api/v1/manager/auth/signin";
      break;
    case option[1].value:
      return "http://localhost:3000/api/v1/staff/auth/signin";
      break;
    case option[2].value:
      return "http://localhost:3000/api/v1/rider/auth/signin";
      break;
    case option[3].value:
      return "http://localhost:3000/api/v1/customer/auth/signin";
      break;
  }
}

function getSignupURL(type) {
  switch (type) {
    case option[0].value:
      return "http://localhost:3000/api/v1/manager/auth/signup";
      break;
    case option[1].value:
      return "http://localhost:3000/api/v1/staff/auth/signup";
      break;
    case option[2].value:
      return "http://localhost:3000/api/v1/rider/auth/signup";
      break;
    case option[3].value:
      return "http://localhost:3000/api/v1/customer/auth/signup";
      break;
  }
}

function login(email, password, type) {
  const data = { email: email, password: password };
  const url = getLoginURL(type);

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  let id = 0;

  return fetch(request)
    .then(handleErrors)
    .then((response) => {
      response.json().then((data) => {
        id = data.id;
        console.log("sign in donezo!!! :D");
        currentUserSubject.next(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        const current = currentUserSubject.value;
        console.log("current: ", current.id);
        console.log("data: ", JSON.stringify(data));
        if (type === option[0].value) {
          currentUserTypeSubject.next(userType.Manager);
          localStorage.setItem("currentUserType", userType.Manager);
        } else if (type === option[1].value) {
          currentUserTypeSubject.next(userType.Staff);
          localStorage.setItem("currentUserType", userType.Staff);
          currentResidSubject.next(data.restaurantid);
          localStorage.setItem("currentResid", JSON.stringify(data.restaurantid));
          console.log('resid: ', currentResidSubject.value);
        } else if (type === option[2].value) {
          const data = {id: id};
          const url = 'http://localhost:3000/api/v1/rider/type';

          var request = new Request(url, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
          });

          fetch(request) 
            .then(handleErrors)
            .then((response) => {
              response.json().then((data) => {
                if (data.type == 'ft') {
                  localStorage.setItem("currentUserType", userType.FTRider);
                  currentUserTypeSubject.next(userType.FTRider);
                } else {
                  localStorage.setItem("currentUserType", userType.PTRider);
                  currentUserTypeSubject.next(userType.PTRider);
                }
              })
            })
        } else if (type === option[3].value) {
          currentUserTypeSubject.next(userType.Customer);
          localStorage.setItem("currentUserType", userType.Customer);
        }
        return data;
      });
    });
}

function signup(firstname, lastname, email, password, type) {
  const data = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
  };
  const url = getSignupURL(type);

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  return fetch(request)
    .then(handleErrors)
    .then((response) => {
      response.json().then((data) => {
        console.log("sign up donezo!!! :D");
        currentUserSubject.next(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        if (type === option[0].value) {
          currentUserTypeSubject.next(userType.Manager);
          localStorage.setItem("currentUserType", userType.Manager);
        } else if (type === option[3].value) {
          currentUserTypeSubject.next(userType.Customer);
          localStorage.setItem("currentUserType", userType.Customer);
        }
        return data;
      });
    });
}

function staffSignup(firstname, lastname, email, password, resid) {
  const data = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
    resid: resid,
  };
  const url = "http://localhost:3000/api/v1/staff/auth/signup";

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  return fetch(request)
    .then(handleErrors)
    .then((response) => {
      response.json().then((data) => {
        console.log("sign up donezo!!! :D");
        currentUserSubject.next(data);
        localStorage.setItem("currentUser", JSON.stringify(data));
        currentUserTypeSubject.next(userType.Staff);
        localStorage.setItem("currentUserType", userType.Staff);
        currentResidSubject.next(data.restaurantid);
        localStorage.setItem("currentResid", JSON.stringify(data.restaurantid));
        return data;
      });
    });
}

function riderSignup(firstname, lastname, email, password, type) {
  const data = {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
    type: type,
  };
  const url = "http://localhost:3000/api/v1/rider/auth/signup";

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  let id = 0;

  return fetch(request)
    .then(handleErrors)
    .then((response) => {
      console.log('response: ', response);
      response.json().then((data) => {
        id = data.id;
        console.log("sign up donezo!!! :D");
        currentUserSubject.next(data);
        localStorage.setItem("currentUser", JSON.stringify(data));

        const newdata = {id: id};
        const url = 'http://localhost:3000/api/v1/rider/type';

        var request = new Request(url, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(newdata)
        });

        fetch(request) 
          .then(handleErrors)
          .then((response) => {
            response.json().then((data) => {
              if (data.type == 'ft') {
                localStorage.setItem("currentUserType", userType.FTRider);
                currentUserTypeSubject.next(userType.FTRider);
              } else {
                localStorage.setItem("currentUserType", userType.PTRider);
                currentUserTypeSubject.next(userType.PTRider);
              }
            })
          })
        return data;
      });
    });
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

function editCustomerProfile(firstname, lastname, email, password, id) {
    const data = {first_name: firstname, last_name: lastname, email: email, password: password, id: id};
    const url = 'http://localhost:3000/api/v1/customer/edit';

    console.log('data: ', JSON.stringify(data));

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
                    console.log('edit profile donezo!');
                    localStorage.removeItem('currentUser');
                    currentUserSubject.next(null);
                    currentUserSubject.next(data);
                    localStorage.setItem('currentUser', JSON.stringify(data));
                })
        })
}

function deleteCustomerProfile(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/customer/delete';

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
                    console.log('delete profile donezo!');
                    localStorage.removeItem('currentUser');
                    currentUserSubject.next(null);
                })
        })
}

function editRiderProfile(firstname, lastname, email, password, id) {
  const data = {first_name: firstname, last_name: lastname, email: email, password: password, id: id};
  const url = 'http://localhost:3000/api/v1/rider/edit';

  console.log('data: ', JSON.stringify(data));

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
                  console.log('edit profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
                  currentUserSubject.next(data);
                  localStorage.setItem('currentUser', JSON.stringify(data));
              })
      })
}

function deleteRiderProfile(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/rider/delete';

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
                  console.log('delete profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
              })
      })
}

function editStaffProfile(firstname, lastname, email, password, id) {
  const data = {first_name: firstname, last_name: lastname, email: email, password: password, id: id};
  const url = 'http://localhost:3000/api/v1/staff/edit';

  console.log('data: ', JSON.stringify(data));

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
                  console.log('edit profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
                  currentUserSubject.next(data);
                  localStorage.setItem('currentUser', JSON.stringify(data));
              })
      })
}

function deleteStaffProfile(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/staff/delete';

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
                  console.log('delete profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
              })
      })
}

function editManagerProfile(firstname, lastname, email, password, id) {
  const data = {first_name: firstname, last_name: lastname, email: email, password: password, id: id};
  const url = 'http://localhost:3000/api/v1/manager/edit';

  console.log('data: ', JSON.stringify(data));

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
                  console.log('edit profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
                  currentUserSubject.next(data);
                  localStorage.setItem('currentUser', JSON.stringify(data));
              })
      })
}

function deleteManagerProfile(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/manager/delete';

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
                  console.log('delete profile donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
              })
      })
}

function deleteRestaurant(id) {
  const data = {id: id};
  const url = 'http://localhost:3000/api/v1/restaurant/delete';

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
                  console.log('delete restaurant donezo!');
                  localStorage.removeItem('currentUser');
                  currentUserSubject.next(null);
              })
      })
}

export const authenticationService = {
    login,
    signup,
    logout,
    staffSignup,
    riderSignup,
    editCustomerProfile,
    deleteCustomerProfile,
    editRiderProfile,
    deleteRiderProfile,
    editStaffProfile,
    deleteStaffProfile,
    editManagerProfile,
    deleteManagerProfile,
    deleteRestaurant,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
    currentUserType: currentUserTypeSubject.asObservable(),
    get currentUserTypeValue () { return currentUserTypeSubject.value },
    currentResid: currentResidSubject.asObservable(),
    get currentResidValue () { return currentResidSubject.value },
}
