import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../redux/userActions";
import { useEffect } from "react";
const ChatOrderIdList = () => {
  const orderIdlist = useSelector((state) => state.orderIdList);
  const [renderIdList, setRenderIdList] = useState([]);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const HandleChange = (e) => {
    dispatch(setOrder(e.target.innerText));
  };
  useEffect(() => {
    if (searchQuery !== "") {
      const filterlist = orderIdlist.filter((id) => id === searchQuery);
      setRenderIdList(filterlist);
    }else if(searchQuery === "") {
      setRenderIdList(orderIdlist)
    }

  }, [searchQuery]);
  useEffect(() => {
    setRenderIdList(orderIdlist);
  }, []);
  return (
    <div className="w-full flex  flex-col justify-center items-center bg-slate-500 h-[70vh] bg-opacity-10 rounded-lg">
      <div className=" w-[100%] h-[20%] flex justify-center items-center flex-col gap-2">
        <h4 className="text-white text-2xl ">Search your OrderId</h4>
        <input
          type="text"
          className="w-[80%] p-4 rounded-md outline-none"
          placeholder="OrderId"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <div className=" flex flex-col gap-3 ">
        {renderIdList.map((item, inx) => {
          return (
            <h2
              className="text-white text-lg cursor-pointer"
              onClick={HandleChange}
              key={inx}
            >
              {item}
            </h2>
          );
        })}
      </div>
    </div>
  );
};

export default ChatOrderIdList;
