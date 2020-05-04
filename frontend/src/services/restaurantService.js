import { BehaviorSubject } from 'rxjs';
import { handleErrors } from '../helpers';

function searchRestaurantResults(data) {
    var results = [];
    data.forEach(result => results.push(result.resid));
    return results;
}

function searchRestaurant(searchQuery) {
    const url = 'http://localhost:3000/api/v1/restaurant/search?keywords=' + searchQuery;
    console.log('url ', url);

    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    return fetch(request)
      .then(handleErrors);
}

function getRestaurant(resid) {
    const data = {resid: resid};
    const url = 'http://localhost:3000/api/v1/restaurant/get';

    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });

    return fetch(request)
        .then(handleErrors)
        .catch((error) => {
            console.log('error: ', error);
        })
}

function deleteRestaurant(resid) {
    const data = {resid: resid};
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
                  console.log('delete resty donezo!');
              })
      })

}

export const restaurantService = {
    searchRestaurant,
    searchRestaurantResults,
    getRestaurant,
    deleteRestaurant
}