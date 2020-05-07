import { BehaviorSubject } from "rxjs";
import { handleErrors } from "../helpers";
import { restaurantService } from "./restaurantService";

const deliveryfee = 4;
const currentCheckOutSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentCheckOut") || "[]")
);
const currentRestaurantSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentRestaurant") || "null")
);
const currentTotalSubject = new BehaviorSubject(
  JSON.parse(sessionStorage.getItem("currentTotal") || 0)
);
const orderPaymentSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("orderPayment") || "null")
);
const promotionAppliedSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("promotionApplied") || "null")
);
const deliveryFeeSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("deliveryFee") || "4")
);

function promotionResults(data) {
  var results = [];
  data.forEach((result) => results.push(result.promotionid));
  return results;
}

const addToCheckOut = (itemid, qty, resid, price) => {
  sessionStorage.removeItem("currentTotal");
  console.log("resid: ", resid);
  // localStorage.removeItem("currentRestaurant");
  console.log("currentRestaurant: ", currentRestaurantSubject.value);
  const item = {
    itemid: itemid,
    qty: qty,
    price: price,
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
};

const removeFromCart = (itemid) => {
  sessionStorage.removeItem("currentTotal");
  if (currentCheckOutSubject.value.length === 1) {
    localStorage.removeItem("currentCheckOut");
    currentCheckOutSubject.next([]);
    localStorage.removeItem("currentRestaurant");
    currentRestaurantSubject.next("null");
  } else {
    let items = currentCheckOutSubject.value;
    console.log("item.itemid: ", itemid);
    for (var i = 0; i < items.length; i++) {
      if (items[i].itemid == itemid) {
        console.log("items[i].itemid: ", items[i].itemid);
        items.splice(i, 1);
      }
    }
    currentCheckOutSubject.next(items);
    localStorage.setItem("currentCheckOut", JSON.stringify(items));
  }
  return currentCheckOutSubject.value.length;
};

const updateCart = (itemid, qty, price) => {
  sessionStorage.removeItem("currentTotal");
  const item = {
    itemid: itemid,
    qty: qty,
    price: price,
  };
  let items = currentCheckOutSubject.value;
  console.log("item.itemid: ", item.itemid);
  for (var i = 0; i < items.length; i++) {
    if (items[i].itemid == item.itemid) {
      console.log("items[i].itemid: ", items[i].itemid);
      items.splice(i, 1);
    }
  }
  items.push(item);
  currentCheckOutSubject.next(items);
  localStorage.setItem("currentCheckOut", JSON.stringify(items));
};

const addToTotal = (subtotal) => {
  const newTotal = currentTotalSubject.value + subtotal;
  currentTotalSubject.next(newTotal);
  sessionStorage.setItem("currentTotal", JSON.stringify(newTotal));
};

const removeFromTotal = (subtotal) => {
  const newTotal = currentTotalSubject.value - subtotal;
  currentTotalSubject.next(newTotal);
  sessionStorage.setItem("currentTotal", JSON.stringify(newTotal));
};

const setOrderPayment = (method) => {
  console.log("method????:", method);
  orderPaymentSubject.next(method);
  localStorage.setItem("orderPayment", JSON.stringify(method));
};

const setAppliedPromotion = (promotionid) => {
  console.log("promotion????:", promotionid);
  promotionAppliedSubject.next(promotionid);
  localStorage.setItem("promotionApplied", JSON.stringify(promotionid));
};

const setDeliveryFee = (fee) => {
  console.log("promotion????:", fee);
  deliveryFeeSubject.next(fee);
  localStorage.setItem("deliveryFee", JSON.stringify(fee));
};

function applicableOrders(resid, total) {
  const data = { id: resid, total: total };
  const url = "http://localhost:3000/api/v1/customer/orders/promotions";

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  return fetch(request).then(handleErrors);
}

function promotionDetails(id) {
  const data = { id: id };
  const url = "http://localhost:3000/api/v1/customer/orders/promotions/details";

  var request = new Request(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  return fetch(request).then(handleErrors);
}

export const orderService = {
  addToCheckOut,
  removeFromCart,
  updateCart,
  addToTotal,
  setOrderPayment,
  applicableOrders,
  promotionResults,
  promotionDetails,
  setAppliedPromotion,
  setDeliveryFee,
  currentCheckOut: currentCheckOutSubject.asObservable(),
  get currentCheckOutValue() {
    return currentCheckOutSubject.value;
  },
  currentRestaurant: currentRestaurantSubject.asObservable(),
  get currentRestaurantValue() {
    return currentRestaurantSubject.value;
  },
  currentTotal: currentTotalSubject.asObservable(),
  get currentTotalValue() {
    return currentTotalSubject.value;
  },
  orderPayment: orderPaymentSubject.asObservable(),
  get orderPaymentValue() {
    return orderPaymentSubject.value;
  },
  promotionApplied: promotionAppliedSubject.asObservable(),
  get promotionAppliedValue() {
    return promotionAppliedSubject.value;
  },
  deliveryFeeSubject: deliveryFeeSubject.asObservable(),
  get deliveryFeeValue() {
    return deliveryFeeSubject.value;
  },
};
