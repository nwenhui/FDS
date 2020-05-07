import { BehaviorSubject } from 'rxjs';
import { handleErrors } from '../helpers';

function fdsPromotionsResults(data) {
    var results = [];
    data.forEach(result => results.push(result.promotionid));
    return results;
  }

function getPromotions() {
    const data = {  };
    const url = 'http://localhost:3000/api/v1/staff/promotions/all';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }
  
  function getPromotionInformation(id) {
    const data = { id: id };
    const url = 'http://localhost:3000/api/v1/staff/promotions/info';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }
  
  function getOngoingPromotions() {
    const data = {  };
    const url = 'http://localhost:3000/api/v1/staff/promotions/ongoing';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }
  
  function getPastPromotions() {
    const data = {  };
    const url = 'http://localhost:3000/api/v1/staff/promotions/past';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }
  
  function newPromotion(start, end, min, disc, freedeli, resid) {
    const data = { start: start, end: end, min: min, disc: disc, freedeli: freedeli, managerid: resid };
    console.log('dataaa', data);
    const url = 'http://localhost:3000/api/v1/staff/promotions/new';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }
  
  function deletePromotion(id) {
    const data = {id: id};
    const url = 'http://localhost:3000/api/v1/staff/promotions/delete';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }

  function editPromotion(start, end, min, disc, freedeli, id) {
    const data = {start: start, end: end, min: min, disc: disc, freedeli: freedeli, id: id};
    const url = 'http://localhost:3000/api/v1/staff/promotion/edit';
  
    var request = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
    });
  
    return fetch(request)
        .then(handleErrors)
  }



export const staffService = {
    getPromotions,
    fdsPromotionsResults,
    getPromotionInformation,
    getOngoingPromotions,
    getPastPromotions,
    newPromotion,
    deletePromotion,
    editPromotion
}