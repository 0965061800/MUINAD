import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CategoryTable from '../components/Tables/CategoryTable';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import useSWR, {Fetcher} from 'swr'
import ProductTable from '../components/Tables/ProductTable';
import { fetcher } from '../service/fetchconfig';


let i = 1;

const ProductPage = () => {

  const [products, setProducts] = useState([]);

  const { data, error} = useSWR('https://localhost:7137/api/Product', fetcher)
  
  useEffect(() =>{
    if (data && data.data) setProducts(data.data)
  },[data]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products"/>

      <div className="flex flex-col gap-10">
        <ProductTable products = {products ?? []}/>
      </div>
    </DefaultLayout>
  );
};

export default ProductPage;
