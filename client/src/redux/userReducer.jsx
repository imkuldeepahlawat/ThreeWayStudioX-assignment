
import * as actionTypes from "./actionTypes";

const initialState = {
  name: "",
  userId: "",
  userName: "",
  orderId: "",
  orderIdList:[],
  userManuF: null,
  userTransP: null,
  login:null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_USER_ID:
      return { ...state, userId: action.payload };
    case actionTypes.SET_USER_NAME:
      return { ...state, userName: action.payload };
    case actionTypes.SET_ORDER:
      return { ...state, orderId: action.payload };
    case actionTypes.SET_ORDER_ID_LIST:
        return {
          ...state,
          orderIdList: action.payload,
        };
    case actionTypes.SET_MANUFACTURER:
      return { ...state, userManuF: action.payload };
    case actionTypes.SET_LOGIN:
      return { ...state, login: action.payload };
    case actionTypes.SET_TRANSPORTER:
      return { ...state, userTransP: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
