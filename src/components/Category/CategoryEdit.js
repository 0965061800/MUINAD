import React, { useEffect } from "react";
import ImageUpload from "../Images/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import SelectCategory from "../Forms/SelectGroup/SelectCategory";
import useSWR from "swr";
import { fetcher } from "../../service/fetchconfig";
import axios from "axios";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

let imageUrlName = "catImage";
let imageName = "imageName";

const schema = yup.object({
  catName: yup
  .string()
  .required("Please enter category's name"),
  alias : yup
  .string()
  .required("Please enter category's alias")
})

const CategoryEdit = ({onCategoryEdited = f => f, catId}) => {
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
        setImage,
        progress,
        handleSelectImage,
        handleDeleteImage,
    } = useFirebaseImage(setValue, getValues, imageUrlName, imageName, deleteCatImage);

    async function deleteCatImage() {
        axios.put(`https://localhost:7137/api/Category/${catId}`, {
            ...catData,
            catImage: "",
            ImageName: ""
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    const { data: catList, error: catListError } = useSWR(
        `https://localhost:7137/api/Category/`,
        fetcher
      );

      const { data: catData, error: catError } = useSWR(
        `https://localhost:7137/api/Category/${catId}`,
        fetcher
      );

    console.log(catData);

    const handleEditCategory = (values) => {
      axios.put(`https://localhost:7137/api/Category/${catId}`, {
        ...values, 
        parentCatId: values.parentCatId === "" ? null : parseInt(values.parentCatId, 10),
      })
      .then(function (response) {
        onCategoryEdited();
        Swal.fire("Success!", "Your product has been edited.", "success");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    useEffect(() => {
      const arrErroes = Object.values(errors);
      console.log(arrErroes)
      if (arrErroes.length > 0) {
        toast.error(arrErroes[0]?.message, {
          pauseOnHover: false,
          delay: 0,
        });
      }
    }, [errors]);

    useEffect(() => {
        if (catData) {
          reset(catData);
          setImage(catData.catImage)
        }
      }, [catData, reset, setImage]);

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-max">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Edit Category
      </h4>
      <div>
        <form onSubmit={handleSubmit(handleEditCategory)}>
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
                Category Name
                </label>
                <Input
                name="catName"
                placeholder="Enter category's name"
                control={control}
                ></Input>
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
                <label className="mb-2.5 block text-black dark:text-white text-nowrap">
                Alias
                </label>
                <Input
                name="alias"
                placeholder="Enter category's alias"
                control={control}
                ></Input>
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
                <label className="mb-2.5 block text-black dark:text-white text-nowrap">
                Description
                </label>
                <Input
                name="description"
                placeholder="Describe the category "
                control={control}
                ></Input>
            </div>
            <div className="w-full">
                <SelectCategory
                name="parentCatId"
                control={control}
                labelName="Category's Parent"
                options={catList}
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

export default CategoryEdit;