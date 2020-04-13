import { BehaviorSubject } from 'rxjs';
import { handleErrors } from '../helpers';

const currentSearchSubject = new BehaviorSubject(localStorage.getItem('currentSearch'));

function searchRestaurantResults(data) {
    var results = [];
    data.forEach(result => results.push(result.resid));
    return results;
}

function searchRestaurant(searchQuery) {
    const data = {search: searchQuery};
    const url = 'http://localhost:3000/api/v1/restaurant/search';

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
            localStorage.setItem('currentSearch', searchRestaurantResults(data));
            currentSearchSubject.next(response);
            return data;
          })
        //   .catch((error) => {
        //       error.text().then( errorMessage => {
        //           console.log('Error: ', errorMessage);
        //       })
        //   })
        //   return data;
        });
}

export const searchService = {
    searchRestaurant,
    currentSearch: currentSearchSubject.asObservable(),
    get currentSeachValue () { return currentSearchSubject.value }
}