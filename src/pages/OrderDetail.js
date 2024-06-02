import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import OrderTable from "../components/Orders/OrderTable";
import { useParams } from "react-router-dom";
import OrderInfo from "../components/Orders/OrderInfo";
import useSWR from "swr";
import { fetcher } from "../service/fetchconfig";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { data: orderData, error: orderError } = useSWR(
    `https://localhost:7137/api/Order/${orderId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  console.log(orderData);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={`OrderId: ${orderId}`} />
      {orderData ? <OrderInfo orderInfo={orderData}></OrderInfo> : <></>}
    </DefaultLayout>
  );
};

export default OrderDetail;
