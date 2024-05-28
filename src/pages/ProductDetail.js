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
import parse from 'html-react-parser';

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
  
  console.log(data);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Detail" />
      <div className="flex gap-10">
        <div className="w-full flex flex-col gap-5 rounded-sm px-5 py-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex gap-3 px-5">
          <div class="w-1/2">
            <div className="product-image">
              <img
                src="https://plus.unsplash.com/premium_photo-1682326302625-1e5b7826fb3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="rounded-lg"
              ></img>
            </div>
          </div>
          <div className="w-full">
              <p className="text-3xl font-bold mb-3">{product?.productName} <span className="text-lg text-opacity-25">({product?.productCode})</span></p>
              {product?.sale > 0 ? <p className="text-base text-black-400 font-bold px-4 mb-1 bg-green-200 w-max rounded-full">-{product?.sale * 100}%</p>:<></>}
              <p className="text-2xl mb-3 bg-blue-300 w-max p-2 text-black font-bold rounded-lg">{product?.productPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}</p>
              <p className="mb-3 text-lg mn-3 font-medium text-justify">{product?.description}</p>
              <div className="flex gap-4">
                <p className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg ">{product?.categoryName}</p>
                <p className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg ">{product?.brandName}</p>
                <p className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg ">{product?.featureName}</p>
              </div>
          </div>
        </div>
        <div className="text-justify">
          {product?.specifications ? parse(product?.specifications):""}
        </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetail;
