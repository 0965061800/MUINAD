import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "../../service/fetchconfig";
import axios from "axios";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import ImageUpload from "../Images/ImageUpload";
import SelectColor from "../Forms/SelectGroup/SelectColor";
import Input from "../inputs/Input";

let imageUrlName = "skuImage";
let imageName = "imageName";

const ProductSkuEdit = ({ skuId, onSkuEdited = f => f , onChangeSku = f => f}) => {
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
  });
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageUrlName, imageName, deleteCatImage);

  async function deleteCatImage() {
      axios.put(`https://localhost:7137/api/ProductSku/${skuId}`, {
          ...skuData,
          skuImage: "",
          ImageName: ""
        })
        .then(function (response) {
          
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  const { data: skuData, error: skuError } = useSWR(
    `https://localhost:7137/api/ProductSku/${skuId}`,
    fetcher
  );

  const { data: colorList, error: colorError } = useSWR(
    `https://localhost:7137/api/Color`,
    fetcher
  );

  const handleEditSku = (values) => {
      axios.put(`https://localhost:7137/api/ProductSku/${skuId}`, {
        ...values
      })
      .then(function (response) {
        onChangeSku();
        Swal.fire("Success!", "Your product has been edited.", "success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    const arrErroes = Object.values(errors);
    console.log(arrErroes);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
      if (skuData) {
        reset({
            ...skuData,
            colorId:skuData.colorDto.colorId
        });
        setImage(skuData.skuImage)
      }
    }, [skuData, reset, setImage]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-max">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Edit Category
      </h4>
      <div>
        <form onSubmit={handleSubmit(handleEditSku)}>
          <div className="w-full">
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </div>
          <div className="mt-5 flex flex-col gap-5">
            <div className="w-full flex gap-4 justify-center items-center">
              <label className="mb-2.5 block text-black dark:text-white text-nowrap">
                Sku
              </label>
              <Input
                name="sku"
                placeholder="Enter Sku"
                control={control}
              ></Input>
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
              <label className="mb-2.5 block text-black dark:text-white text-nowrap">
                Price
              </label>
              <Input
                name="unitPrice"
                placeholder="Enter Price"
                control={control}
              ></Input>
            </div>
            <div className="w-full">
              <SelectColor
                name="colorId"
                control={control}
                labelName="Color"
                options={colorList}
              />
            </div>
          </div>
          <button className="flex w-full justify-center rounded bg-primary p-3 mb-3 font-medium text-gray hover:bg-opacity-90">
            Edit Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductSkuEdit;
