import { BehaviorSubject } from "rxjs";
import { handleErrors } from "../helpers";

const currentCheckOutSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentCheckOut") || "[]"));

function addToCheckOut(itemid, qty) {
    const item = {
        itemid: itemid,
        qty: qty
    };
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
}

export const orderService = {
    addToCheckOut,
    currentCheckOut: currentCheckOutSubject.asObservable(),
    get currentCheckOutValue() { return currentCheckOutSubject.value },
}