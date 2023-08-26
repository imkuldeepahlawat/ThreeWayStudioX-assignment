import * as actionTypes from "./actionTypes";

export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  payload: name,
});

export const setUserId = (userId) => ({
  type: actionTypes.SET_USER_ID,
  payload: userId,
});

export const setUserName = (userName) => ({
  type: actionTypes.SET_USER_NAME,
  payload: userName,
});

export const setOrder = (orderId) => ({
  type: actionTypes.SET_ORDER,
  payload: orderId,
});

export const setManufacturer = (manufacturer) => ({
  type: actionTypes.SET_MANUFACTURER,
  payload: manufacturer,
});

export const setTransporter = (transporter) => ({
  type: actionTypes.SET_TRANSPORTER,
  payload: transporter,
});
export const setOrderIdList = (orderIdList) => ({
  type: actionTypes.SET_ORDER_ID_LIST,
  payload: orderIdList,
});
export const setLogin = (login) => ({
  type: actionTypes.SET_LOGIN,
  payload: login,
});
