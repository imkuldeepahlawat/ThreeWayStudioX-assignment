import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useSelector } from "react-redux";
import { createNewOrderRoute } from "../utils/ServerRoutes";
import { useDispatch } from "react-redux";
import { setOrderIdList } from "../redux/userActions";
import { Link } from "react-router-dom";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const userId = useSelector((state) => state.userId);
  const login = useSelector((state) => state.login);
  
  let myorderid = uuidv4();
  const [inputField, setInputField] = useState({
    orderId: myorderid,
    from: "",
    to: "",
    quantity: "",
    pickup: "",
    transporter: "",
  });
  const handleChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const validateInput = (data) => {
    if (data.orderId === "") {
      enqueueSnackbar("OrderId is not created something went wrong", {
        variant: "warning",
      });
      return false;
    } else if (data.from === "") {
      enqueueSnackbar("Source Must be needed", {
        variant: "warning",
      });
      return false;
    } else if (data.to === "") {
      enqueueSnackbar("Destination Must be needed", {
        variant: "warning",
      });
      return false;
    } else if (data.quantity === 0) {
      enqueueSnackbar("quantity Must be needed", {
        variant: "warning",
      });
      return false;
    } else if (data.pickup === "") {
      enqueueSnackbar("pickup Must be needed", {
        variant: "warning",
      });
      return false;
    } else if (data.transporter === 0) {
      enqueueSnackbar("pickup Must be needed", {
        variant: "warning",
      });
      return false;
    } else {
      enqueueSnackbar("fields are valid", {
        variant: "success",
      });
      return true;
    }
  };
  const createNewOrder = async () => {
    if (validateInput(inputField)) {
      const userdata = {...inputField,[userId]:userId}
      try {
        const url = createNewOrderRoute;
        const res = axios.post(url, userdata);
        dispatch(setOrderIdList((await res).data.orderList));
      } catch (error) {
        navigate("/manufacturerDashboard");
      }
    }
  };
  return login === true ? (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <ul className="flex  gap-3">
        <li className="flex flex-col justify-between">
          <h3 className="text-white text-xl">Order-Id</h3>
          <h3 className="text-white text-xl">From</h3>
          <h3 className="text-white text-xl">TO</h3>
          <h3 className="text-white text-xl">Quantity</h3>
          <h3 className="text-white text-xl">Pickup </h3>
          <h3 className="text-white text-xl">Transporter</h3>
        </li>
        <li className="flex flex-col  items-center  gap-3">
          <input
            type="text"
            className="outline-none rounded-md p-2"
            placeholder="OrderId"
            name="orderId"
            value={inputField.orderId}
            disabled
          />
          <input
            type="text"
            className="outline-none rounded-md p-2"
            placeholder="From"
            name="from"
            value={inputField.from}
            onChange={handleChange}
          />
          <input
            type="text"
            className="outline-none rounded-md p-2"
            placeholder="To"
            name="to"
            value={inputField.to}
            onChange={handleChange}
          />
          <input
            type="number"
            min={0}
            className="outline-none rounded-md p-2"
            placeholder="quantity"
            name="quantity"
            onChange={handleChange}
          />
          <input
            type="text"
            className="outline-none rounded-md p-2"
            placeholder="pickup"
            name="pickup"
            value={inputField.pickup}
            onChange={handleChange}
          />
          <div className="w-full">
            <select name="transport" className="w-full rounded-md p-2">
              <option disabled className="p-2">
                Please Select one
              </option>
              <option
                value="fedex"
                onClick={(e) => {
                  setInputField({ ...inputField, transporter: e.target.value });
                  console.log(inputField.transporter);
                }}
              >
                FedEx
              </option>
            </select>
          </div>
        </li>
      </ul>
      <button
        className="bg-white text-xl font-semibold px-10 py-4 my-4 rounded-md"
        onClick={createNewOrder}
      >
        Create
      </button>
    </div>
  ) : (
    <>
      <div className="flex flex-col gap-3 justify-center items-center h-[100vh]">
        <h2 className="text-white text-4xl">:| 404 Unable to access!!!</h2>
        <Link to="/login">
          <button className="text-black font-semibold  bg-white px-4 text-2xl rounded-md ">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default CreateOrder;
