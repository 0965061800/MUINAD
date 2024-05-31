import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import useSWR, {Fetcher} from 'swr'
import ProductTable from '../components/Tables/ProductTable';
import { fetcher } from '../service/fetchconfig';
import SelectCategory from '../components/Forms/SelectGroup/SelectCategory';
import SelectBrand from '../components/Forms/SelectGroup/SelectBrand';
import SelectFeature from '../components/Forms/SelectGroup/SelectFeature';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoFoundProduct from './UiElements/NoFoundProduct';


const ProductPage = () => {

  const [products, setProducts] = useState([]);

  const { data, error} = useSWR('https://localhost:7137/api/Product', fetcher,  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    })
  
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
    }
  });

  const { data: catData, error: catError } = useSWR(
    `https://localhost:7137/api/Category`,
    fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
    }
  );
  
  const { data: brandData, error: brandError } = useSWR(
    `https://localhost:7137/api/Brand`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
      }
  );
  
  const { data: featureData, error: featureError } = useSWR(
    `https://localhost:7137/api/Feature`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  
  useEffect(() =>{
    if (data && data.data) setProducts(data.data)
  },[data]);

  const handleFilterProduct = (values) => {
    console.log(values);
    let query = {
      CategoryId : values.categoryId ? parseInt(values.categoryId, 10):0,
      BrandId : values.brandId ? parseInt(values.brandId, 10) : 0,
      FeatureId: values.featureId ? parseInt(values.featureId, 10) : 0,
    }
    console.log(query);
    axios.get('https://localhost:7137/api/Product', { params: query })
    .then(response => {
        setProducts(response.data.data)
    })
    .catch(error => {
        toast.error("Something went wrong with the system");
    });
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      <form onSubmit={handleSubmit(handleFilterProduct)}>
        <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
          <SelectCategory
            name="categoryId"
            control={control}
            labelName="Category"
            options={catData}
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
           <button className="flex w-max h-max justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-8">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-1">
              <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
            </svg> Filter
            </button>
        </div>
      </form>
      {products.length === 0 ?  <NoFoundProduct></NoFoundProduct>:
      <div className="flex flex-col gap-10">
        <ProductTable
          products={products ?? []}
          onDelete={(value) => setProducts(value)}
        />
      </div>
      }
    </DefaultLayout>
  );
};

export default ProductPage;
