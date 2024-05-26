import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import SelectGroupOne from "../components/Forms/SelectGroup/SelectGroupOne";
import SwitcherOne from "../components/Switchers/SwitcherOne";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "../service/fetchconfig";
import { useParams } from "react-router-dom";
import Input from "../components/inputs/Input";
import SelectCategory from "../components/Forms/SelectGroup/SelectCategory";
import flattenCategories from "../utils/flatternCat";
import SelectBrand from "../components/Forms/SelectGroup/SelectBrand";
import SelectFeature from "../components/Forms/SelectGroup/SelectFeature";
import Toggle from "../components/Switchers/Toggle";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductEdit = () => {
  const { productId } = useParams();
  const [content, setContent] = useState("")
  console.log(content)
  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  
  const { data: productData, error: productError } = useSWR(
    `https://localhost:7137/api/Product/${productId}`,
    fetcher
  );
  
  const { data: catData, error: catError } = useSWR(
    `https://localhost:7137/api/Category`,
    fetcher
  );
  
  const { data: brandData, error: brandError } = useSWR(
    `https://localhost:7137/api/Brand`,
    fetcher
  );
  
  const { data: featureData, error: featureError } = useSWR(
    `https://localhost:7137/api/Feature`,
    fetcher
  );
  
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if (productData) {
      reset(productData);
      setContent(productData.specifications)
    }
  }, [productData, reset]);
  
  useEffect(() => {
    if (catData) {
      setCategories(flattenCategories(catData));
    }
  }, [catData]);
  
  const handleUpdateProduct = async (values) => {
    console.log(values);
  };
  
  const watchBestSeller = watch("bestSeller");
  const watchActive = watch("Active");
  
  if (productError || catError || brandError || featureError) {
    return <div>Error loading data</div>;
  }

  if (!productData || !catData || !brandData || !featureData) {
    return <div>Loading...</div>;
  }

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
                    <Toggle
                      on={watchBestSeller === true}
                      onClick={() => setValue("bestSeller", !watchBestSeller)}
                    />
                  </div>
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Active
                    </label>
                    <Toggle
                      on={watchBestSeller === true}
                      onClick={() => setValue("bestSeller", !watchBestSeller)}
                    />
                  </div>
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sale
                    </label>
                    <Input name="sale" control={control}></Input>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <Input name="description" control={control}></Input>
                </div>

                <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
                  <SelectCategory
                    name="categoryId"
                    control={control}
                    labelName="Category"
                    options={categories}
                  />
                  <SelectBrand
                    name="brandId"
                    control={control}
                    labelName="Brand"
                    options={brandData}
                  />
                  <SelectFeature
                    name="featureId"
                    control={control}
                    labelName="Feature"
                    options={featureData}
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Specifications
                  </label>
                  <ReactQuill theme="snow" value={content} onChange={setContent} />
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
