import React from "react";
import dayFormat from "../../utils/dayFormat";
import { useNavigate } from "react-router-dom";
import OrderTable from "../Orders/OrderTable";

const UserInfo = ({ userInfo }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex flex-col gap-3">
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            User
          </span>
          : {userInfo.userName}
        </p>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            Phone
          </span>
          : {userInfo.phone}
        </p>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            Email
          </span>
          : {userInfo.email}
        </p>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            FullName
          </span>
          : {userInfo.firstName + " " + userInfo.lastName}
        </p>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            Status
          </span>
          : {userInfo.active ? "active" : "block"}
        </p>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            Address
          </span>
          : {userInfo.address}
        </p>
      </div>
      <OrderTable orders={userInfo.orders}></OrderTable>
    </div>
  );
};

export default UserInfo;
