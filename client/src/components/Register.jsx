import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerRouteM, registerRouteP } from "../utils/ServerRoutes";
import {
  setLogin,
  setManufacturer,
  setName,
  setTransporter,
  setUserId,
} from "../redux/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectType, setSelectType] = useState(false);
  const [manuF, setManuF] = useState(false);
  const [inputField, setInputField] = useState({
    username: "",
    name: "",
    password: "",
    confirm_password: "",
  });
  const handleTypeChange = () => {
    setSelectType(true);
  };
  const handleInputField = (e) => {
   
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    });
  };
  const validateInput = (data) => {
    if (data.name === "") {
      enqueueSnackbar("Name Should not be empty", { variant: "warning" });
      return false;
    } else if (data.username === "") {
      enqueueSnackbar("Username Should not be empty", { variant: "warning" });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password Should not be empty", { variant: "warning" });
      return false;
    } else if (data.password !== data.confirm_password) {
      enqueueSnackbar("Password is not matching", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };
  const registerUser = async () => {
    if (validateInput(inputField)) {
      try {
        const userData = {
          name: inputField.name,
          username: inputField.username,
          password: inputField.password,
          userType: manuF ? `manufacturer` : `transporter`,
        };
        console.log(userData);
        const url = manuF ? registerRouteM : registerRouteP;
        const res = await axios.post(url,userData);
        dispatch(setUserId(res.data._id));
        dispatch(setName(res.data.name));
        dispatch(setLogin(true));
        if (manuF) {
          dispatch(setManufacturer(true));
          navigate("/manufacturerDashboard");
          enqueueSnackbar("Register SuccessFull", {
            variant: "success",
          });
        } else {
          dispatch(setTransporter(true));
          navigate("/transporterDashboard");
          enqueueSnackbar("Register SuccessFull", {
            variant: "success",
          });
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  };
  return !selectType ? (
    <div className="w-full flex justify-center items-center  h-[100vh] text-white text-center ">
      <ul className="">
        <li
          onClick={() => {
            setSelectType(true);
            setManuF(true);
          }}
          className="text-2xl hover:bg-slate-400 p-3 rounded-md font-semibold my-5 cursor-pointer"
        >
          Manufacturer
        </li>
        <li
          onClick={handleTypeChange}
          className="text-2xl hover:bg-slate-400 p-3 rounded-md font-semibold my-5 cursor-pointer"
        >
          Transporter
        </li>
      </ul>
    </div>
  ) : (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <div className="flex flex-col justify-center items-center gap-4 ">
        <h3 className="text-white text-3xl">{`Register as ${manuF ? `Manufacturer` : `Transporter`}`}</h3>
        <ul className="flex gap-2">
          <li className="flex flex-col justify-between ">
            <h4 className="text-white">Username *</h4>
            <h4 className="text-white">Name *</h4>
            <h4 className="text-white">Password *</h4>
            <h4 className="text-white">Confirm Password *</h4>
          </li>
          <li className="flex flex-col gap-3 items-center ">
            <input
              onChange={handleInputField}
              type="text"
              name="username"
              placeholder="enter your username"
              className="p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={handleInputField}
              type="text"
              name="name"
              placeholder="enter your name"
              className="p-2 rounded-md outline-none"
              required
            />

            <input
              onChange={handleInputField}
              type="password"
              name="password"
              placeholder="enter your password"
              className="p-2 rounded-md outline-none"
              required
            />
            <input
              onChange={handleInputField}
              type="text"
              name="confirm_password"
              placeholder="Confirm Password"
              className="p-2 rounded-md outline-none"
              required
            />
          </li>
        </ul>
        <button
          onClick={registerUser}
          className="bg-[#334155] font-semibold  rounded-md px-10 text-2xl py-3"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
