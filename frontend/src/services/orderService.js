import { BehaviorSubject } from "rxjs";
import { handleErrors } from "../helpers";

const currentCheckOutSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentCheckOut") || "[]")
);
const currentRestaurantSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentRestaurant") || "null")
);

function addToCheckOut(itemid, qty, resid) {
  // console.log('resid: ', resid);
  // localStorage.removeItem("currentRestaurant");
  console.log("currentRestaurant: ", currentRestaurantSubject.value);
  const item = {
    itemid: itemid,
    qty: qty,
  };
  if (currentRestaurantSubject.value === null) {
    console.log("nullsies");
    currentRestaurantSubject.next(resid);
    localStorage.setItem("currentRestaurant", JSON.stringify(resid));
  } else if (currentRestaurantSubject.value != resid) {
    console.log("not samesies");
    throw "Only items from the same restaurant can be added to cart at the same time. Please remove items from cart before proceeding.";
  }
  console.log("currentRestaurant: ", currentRestaurantSubject.value);
  console.log("item: ", item);
  // localStorage.removeItem("currentCheckOut");
  let items = currentCheckOutSubject.value;
  console.log("item.itemid: ", item.itemid);
  for (var i = 0; i < items.length; i++) {
    if (items[i].itemid == item.itemid) {
      console.log("items[i].itemid: ", items[i].itemid);
      items.splice(i, 1);
    }
  }
  items.push(item);
  console.log("items: ", items);
  currentCheckOutSubject.next(items);
  localStorage.setItem("currentCheckOut", JSON.stringify(items));
  console.log("length: ", currentCheckOutSubject.value.length);
  return currentCheckOutSubject.value.length;
}

export const orderService = {
  addToCheckOut,
  currentCheckOut: currentCheckOutSubject.asObservable(),
  get currentCheckOutValue() {
    return currentCheckOutSubject.value;
  },
  // currentRestaurant: currentRestaurantSubject.asObservable(),
  // get currentRestaurantValue() { return currentRestaurantSubject.value },
};
