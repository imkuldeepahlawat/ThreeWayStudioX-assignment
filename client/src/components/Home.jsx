import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full flex justify-center items-center h-[100vh]">
      <div className="bg-[#334155] flex rounded-md gap-4 flex-col py-10  px-24 justify-center text-center">
        <Link to="/login">
          <button className="hover:bg-slate-400 p-4 rounded-md  text-2xl font-semibold">Login</button>
        </Link>
        <Link to="/register">
          <button className="hover:bg-slate-400 p-4 rounded-md  text-2xl font-semibold">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
