import React from "react";
import dayFormat from "../../utils/dayFormat";
import { useNavigate } from "react-router-dom";

const OrderInfo = ({ orderInfo, orderDetails = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-5 flex flex-col gap-3">
        <div className="mb-3 flex gap-10">
          <p>
            <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
              User
            </span>
            : {orderInfo.userName}
          </p>
          <p>
            <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
              Sum
            </span>
            :{" "}
            {orderInfo.sumTotal.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p>
            <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
              Phone
            </span>
            : {orderInfo.phone}
          </p>
          <p>
            <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
              Buy Date
            </span>
            : {dayFormat(orderInfo.createDate)}
          </p>
          <p>
            <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
              Status
            </span>
            : {orderInfo.transactionStatus}
          </p>
        </div>
        <p>
          <span className="text-black font-bold bg-blue-200 dark:text-white dark:bg-blue-900 px-3 rounded-lg">
            Address
          </span>
          : {orderInfo.address}
        </p>
      </div>
      <div className="max-w-full overflow-x-auto">
        <p className="dark:text-white text-xl font-bold mb-1">Order Detail</p>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Product
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Color
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Unit Price
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {orderInfo.orderDetailDtos.map((order, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white hover:underline" onClick={() => navigate(`/products/${order.productId}`)}>
                    {order.productName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {order.colorName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order.unitPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order.quantity}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order.total.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderInfo;
