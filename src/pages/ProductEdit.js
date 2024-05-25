import React, { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import SelectGroupOne from "../components/Forms/SelectGroup/SelectGroupOne";
import SwitcherOne from "../components/Switchers/SwitcherOne";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "../service/fetchconfig";
import { useParams } from "react-router-dom";
import Input from "../components/inputs/Input";

const ProductEdit = () => {
  const { productId } = useParams();
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { data, error } = useSWR(
    `https://localhost:7137/api/Product/${productId}`,
    fetcher
  );

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  console.log(data);
  const handleUpdateProduct = async (values) => {
    console.log(values);
  }

  const watchStatus = watch("status");
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Edit" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit form
              </h3>
            </div>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <span className="text-meta-1">*</span>Product Name
                    </label>
                    <Input name="productName" control={control}></Input>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <span className="text-meta-1">*</span>Price
                    </label>
                    <Input name="productPrice" control={control}></Input>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alias
                    </label>
                    <Input name="alias" control={control}></Input>
                  </div>
                </div>

                <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Best seller
                    </label>
                    <SwitcherOne />
                  </div>
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Active
                    </label>
                    <SwitcherOne />
                  </div>
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sale
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
                  <SelectGroupOne name="Category" options />
                  <SelectGroupOne name="Brand" options />
                  <SelectGroupOne name="Feature" options />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Specifications
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your specifications"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductEdit;
