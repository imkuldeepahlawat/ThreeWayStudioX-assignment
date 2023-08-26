import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { loginRoute } from "../utils/ServerRoutes";
import axios from "axios";
import { setLogin, setManufacturer, setName, setTransporter, setUserId,setOrderIdList } from "../redux/userActions";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const userManuF = useSelector((state) => state.userManuF);
  const userTransP = useSelector((state) => state.userTransP);
  const userLogin = useSelector((state) => state.login);
  const [userType, setUserType] = useState(null);
  const [userProf, setUserProf] = useState(null);
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (userLogin) {
      if (userManuF) {
        navigate("/manufacturerDashboard");
      } else if (userTransP) {
        navigate("/transporterDashboard");
      }
    }
  }, []);
  const handleChange = () => {
    setUserType(true);
  };
  const validateInput = (data) => {
    if (data.username === "") {
      enqueueSnackbar("Username is Compulsory", {
        variant: "warning",
      });
      return false;
    } else if (data.password === "") {
      enqueueSnackbar("Password must be valid", {
        variant: "warning",
      });
      return false;
    } else return true;
  };
  const handleSubmit = async () => {
    if (validateInput(inputField)) {
      console.log(userProf);
      const userData = {
        username: inputField.username,
        password: inputField.password,
        userType: userProf ? `manufacturer` : `transporter`,
      };
      try {
        const res = await axios.post(loginRoute, userData);
        console.log(res);
        dispatch(setLogin(true));
        dispatch(setName(res.data.user.name));
        dispatch(setUserId(res.data.user._id));
        // console.log(res.data.user)
        dispatch(setOrderIdList(res.data.user.orderList))
        if (userProf) {
          dispatch(setManufacturer(true));
          navigate("/manufacturerDashboard");
          enqueueSnackbar("Register SuccessFull", {
            variant: "success",
          });
        } else {
          dispatch(setTransporter(true));
          navigate("/transporterDashboard");
          enqueueSnackbar("Login SuccessFull", {
            variant: "success",
          });
        }
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    }
  };
  const submitChange = (e)=>{
    setInputField({...inputField,[e.target.name]:e.target.value})
  }
  return userType ? (
    <>
      <div className="w-[100vw] gap-4 h-[100vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl text-white">
          Login as {userProf ? "Manufacturer" : "Transporter"}
        </h2>
        <ul className="flex gap-4">
          <li className="flex justify-between flex-col ">
            <h3 className="text-3xl text-white font-semibold">Username</h3>
            <h3 className="text-3xl text-white font-semibold">Password</h3>
          </li>
          <li className="flex flex-col gap-3 items-center">
            <input
              name="username"
              placeholder="User Name"
              className="outline-none  rounded-md p-3"
              type="text"
              onChange={submitChange}
            />
            <input
              placeholder="Password"
              className="outline-none  rounded-md p-3"
              type="password"
              name="password"
              onChange={submitChange}
            />
          </li>
        </ul>
        <button
          className="text-white bg-slate-600 px-10 py-4 text-2xl rounded-md  font-semibold"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </>
  ) : (
    <>
      <div
        className="w-[100vw] h-[100vh] flex flex-col gap-4 justify-center 
      items-center"
      >
        <h2 className="text-4xl uppercase px-10 text-white">You are a</h2>
        <ul className="flex flex-col gap-4">
          <li
            className="text-4xl uppercase px-10  bg-slate-300 rounded-md p-3 cursor-pointer"
            onClick={() => {
              handleChange(true);
              setUserProf(true);
            }}
          >
            manufacturer
          </li>
          <li
            className="text-4xl uppercase px-10  bg-slate-300 rounded-md p-3 cursor-pointer"
            onClick={handleChange}
          >
            transporter
          </li>
        </ul>
      </div>
    </>
  );
};

export default Login;
