import { BehaviorSubject } from "rxjs";
import { handleErrors } from "../helpers";
import {restaurantService } from "./restaurantService";

const deliveryfee = 4;
const currentCheckOutSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentCheckOut") || "[]"));
const currentRestaurantSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentRestaurant") || "null"));
const currentTotalSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentTotal") || deliveryfee));
const orderPaymentSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("orderPayment") || "null"));


const addToCheckOut = ((itemid, qty, resid) => {
    localStorage.removeItem("currentTotal");
    console.log('resid: ', resid);
    // localStorage.removeItem("currentRestaurant");
    console.log("currentRestaurant: ", currentRestaurantSubject.value)
    const item = {
        itemid: itemid,
        qty: qty
    };
    if (currentRestaurantSubject.value === null) {
        console.log('nullsies')
        currentRestaurantSubject.next(resid);
        localStorage.setItem("currentRestaurant", JSON.stringify(resid));
    } else if (currentRestaurantSubject.value != resid) {
        console.log('not samesies')
        throw ("Only items from the same restaurant can be added to cart at the same time. Please remove items from cart before proceeding.");
    }
    console.log("currentRestaurant: ", currentRestaurantSubject.value)
    console.log('item: ', item);
    // localStorage.removeItem("currentCheckOut");
    let items = currentCheckOutSubject.value;
    console.log('item.itemid: ',item.itemid);
    for (var i = 0; i < items.length; i++) {
        if (items[i].itemid == item.itemid) {
            console.log('items[i].itemid: ', items[i].itemid)
            items.splice(i, 1);
        }
    }
    items.push(item);
    console.log('items: ', items);
    currentCheckOutSubject.next(items);
    localStorage.setItem("currentCheckOut", JSON.stringify(items));
    console.log('length: ', currentCheckOutSubject.value.length)
    return currentCheckOutSubject.value.length;
})

const removeFromCart = ((itemid) => {
    localStorage.removeItem("currentTotal");
    if (currentCheckOutSubject.value.length === 1) {
        localStorage.removeItem("currentCheckOut");
        currentCheckOutSubject.next([]);
        localStorage.removeItem("currentRestaurant");
        currentRestaurantSubject.next("null");
    } else {
        let items = currentCheckOutSubject.value;
        console.log('item.itemid: ', itemid);
        for (var i = 0; i < items.length; i++) {
            if (items[i].itemid == itemid) {
                console.log('items[i].itemid: ', items[i].itemid)
                items.splice(i, 1);
            }
        }
        currentCheckOutSubject.next(items);
        localStorage.setItem("currentCheckOut", JSON.stringify(items));
    }
    return currentCheckOutSubject.value.length;
})

const updateCart = ((itemid, qty) => {
    localStorage.removeItem("currentTotal");
    const item = {
        itemid: itemid,
        qty: qty
    };
    let items = currentCheckOutSubject.value;
    console.log('item.itemid: ',item.itemid);
    for (var i = 0; i < items.length; i++) {
        if (items[i].itemid == item.itemid) {
            console.log('items[i].itemid: ', items[i].itemid)
            items.splice(i, 1);
        }
    }
    items.push(item);
    currentCheckOutSubject.next(items);
    localStorage.setItem("currentCheckOut", JSON.stringify(items));
})

const addToTotal = ((subtotal) => {
    const newTotal = currentTotalSubject.value + subtotal;
    currentTotalSubject.next(newTotal);
    localStorage.setItem("currentTotal", JSON.stringify(newTotal));
})

const removeFromTotal = ((subtotal) => {
    const newTotal = currentTotalSubject.value - subtotal;
    currentTotalSubject.next(newTotal);
    localStorage.setItem("currentTotal", JSON.stringify(newTotal));
})

const setOrderPayment = ((method) => {
    orderPaymentSubject.next(method);
    localStorage.setItem("orderPayment", JSON.stringify(method))
})


export const orderService = {
    addToCheckOut,
    removeFromCart,
    updateCart,
    addToTotal,
    setOrderPayment,
    currentCheckOut: currentCheckOutSubject.asObservable(),
    get currentCheckOutValue() { return currentCheckOutSubject.value },
    currentRestaurant: currentRestaurantSubject.asObservable(),
    get currentRestaurantValue() { return currentRestaurantSubject.value },
    currentTotal: currentTotalSubject.asObservable(),
    get currentTotalValue() { return currentTotalSubject.value },
}