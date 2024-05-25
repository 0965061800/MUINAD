import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableThree from "../components/Tables/TableThree";
import useSWR from "swr";
import { fetcher } from "../service/fetchconfig";
import { Link, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";

const ProductDetail = () => {

  const [product, setProduct] = useState();

  const { productId } = useParams();
  console.log(productId);
  // const [product, setProduct] = useState(null);

  const { data, error } = useSWR(
    `https://localhost:7137/api/Product/${productId}`,
    fetcher
  );

  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Detail" />

      <div className="flex gap-10">
        <div className="product-image w-1/4">
          <img
            src="https://plus.unsplash.com/premium_photo-1682326302625-1e5b7826fb3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          ></img>
        </div>
        <div className="w-full h-screen rounded-sm px-5 py-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="product_info py-3 flex align-center gap-1 border-b-2 border-stroke dark:border-stroke-dark">
                <div className="font-bold bg-slate-900 text-white rounded-lg px-3">
                    Name
                </div>
                <div className="">
                    {product?.productName}
                </div>
            </div>
            <div className="product_info py-3 flex align-center gap-1 border-b-2 border-stroke dark:border-stroke-dark">
                <div className="font-bold bg-slate-900 text-white rounded-lg px-3">
                    Price
                </div>
                <div className="">
                    {product?.productPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
                </div>
            </div>
            <div className="product_info py-3 flex align-center gap-1 border-b-2 border-stroke dark:border-stroke-dark">
                <div className="font-bold bg-slate-900 text-white rounded-lg px-3">
                    Price
                </div>
                <div className="">
                    {product?.productPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
                </div>
            </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetail;
