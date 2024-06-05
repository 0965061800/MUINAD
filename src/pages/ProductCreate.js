import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { useForm, useWatch } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "../service/fetchconfig";
import Input from "../components/inputs/Input";
import SelectCategory from "../components/Forms/SelectGroup/SelectCategory";
import flattenCategories from "../utils/flatternCat";
import SelectBrand from "../components/Forms/SelectGroup/SelectBrand";
import SelectFeature from "../components/Forms/SelectGroup/SelectFeature";
import Toggle from "../components/Switchers/Toggle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectColor from "../components/Forms/SelectGroup/SelectColor";
import axios from "axios";
import useFirebaseImage from "../hooks/useFirebaseImage";
import ImageUpload from "../components/Images/ImageUpload";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const  imageUrlName = "productImage"
const imageName = "imageName"

const schema = yup.object({
  productName: yup
    .string()
    .min(10, "Please enter product's name more than 10 character")
    .required("Please enter product's name"),
  productPrice: yup
    .number("Please enter your's productPrice like a number")
    .required("Please enter your's productPrice"),
  productCode: yup
    .string()
    .min(5, "Please enter product's code more than 5 character")
    .required("Please enter product's code"),
  alias: yup
    .string()
    .min(5, "Please enter product's alias more than 5 characters"),
  colorId: yup
    .number("Please choose product's color")
    .required("Please choose a default color"),
});

const ProductCreate = () => {
  const [content, setContent] = useState("");
  const {
    control,
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageUrlName, imageName);
  const { data: catData, error: catError } = useSWR(
    `https://localhost:7137/api/Category`,
    fetcher
  );

  const { data: colorData, error: colorError } = useSWR(
    `https://localhost:7137/api/Color`,
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
    if (catData) {
      setCategories(flattenCategories(catData));
    }
  }, [catData]);

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const handleCreateProduct = async (values) => {
    axios.post('https://localhost:7137/api/Product', {
        ...values, 
        specifications: content,
        categoryId: parseInt(values.categoryId, 10),
        brandId: parseInt(values.brandId, 10),
        featureId: parseInt(values.featureId, 10),
        colorId: parseInt(values.colorId, 10),
        productPrice: parseFloat(values.productPrice)
      })
      .then(function (response) {
        console.log(1);
        Swal.fire("Created!", "Your product has been created.", "success");
        reset({
          image:"",
        });
        setContent("");
        handleResetUpload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const watchBestSeller = watch("bestSeller");

  if (catError || brandError || featureError || colorError) {
    return <div>Error loading data</div>;
  }

  if (!catData || !brandData || !featureData || !colorData) {
    return <div>Loading...</div>;
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Create" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create product
              </h3>
            </div>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <span className="text-meta-1">*</span>Product Name
                    </label>
                    <Input name="productName" placeholder="Enter product's name" control={control}></Input>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      <span className="text-meta-1">*</span>Price
                    </label>
                    <Input name="productPrice" placeholder="Enter product's price" type="number" control={control}></Input>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Alias
                    </label>
                    <Input name="alias" placeholder="Enter product's alias" control={control}></Input>
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
                      Sale
                    </label>
                    <Input name="sale"  placeholder="Enter product's sale" control={control}></Input>
                  </div>
                </div>
                <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Code
                    </label>
                    <Input name="productCode" placeholder="Enter product's code" control={control}></Input>
                  </div>
                  <div className="w-full xl:w-1/2 flex gap-4">
                    <SelectColor
                      name="colorId"
                      control={control}
                      labelName="Default Color"
                      options={colorData}
                    />
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
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full">
          <ImageUpload
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            className="h-[250px]"
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductCreate;
