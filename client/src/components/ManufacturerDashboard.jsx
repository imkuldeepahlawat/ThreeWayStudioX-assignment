import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatOrderIdList from "./ChatOrderIdList";
import ChatContainer from "./ChatContainer";
import { useSnackbar } from "notistack";
import { setLogin, setUserId } from "../redux/userActions";

const ManufacturerDashboard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userId = useSelector((state) => state.userId);
  const orderIdList = useSelector((state) => state.orderIdList);
  const userManuF = useSelector((state) => state.userManuF);
  const login = useSelector((state) => state.login);
  return login === true ? (
    <>
      {orderIdList.length === 0 ? (
        <div className="flex flex-col gap-3 justify-center items-center h-[100vh]">
          <h2 className="text-white text-4xl">
            Oops You dont have any Order!!!
          </h2>
          <p className="text-white font-semibold">
            Would you like to create a new one{" "}
            <span className="text-3xl text-yellow-400">{`:)`}</span>{" "}
          </p>
          <Link to="/createOrder">
            <button className="text-black font-semibold  bg-white px-4 text-2xl rounded-md ">
              Create Order
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-[100vw]">
          {/* navbar */}
          <div className="">
            <div className="flex justify-between p-4">
              <Link to={"/"}>
                <button>Home</button>
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  dispatch(setUserId(""));
                  dispatch(setLogin(null));
                  enqueueSnackbar("Logout SuccessFull", {
                    variant: "success",
                  });
                }}
              >
                <button>Logout</button>
              </Link>
            </div>
          </div>
          {/* messageId list */}
          <div className="flex p-2 gap-2">
            <div className="w-[30%] h-full">
              <ChatOrderIdList />
            </div>
            <div className="w-[70%]">
              <ChatContainer />
            </div>
          </div>
        </div>
      )}
    </>
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

export default ManufacturerDashboard;
