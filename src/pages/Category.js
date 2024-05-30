import useSWR from "swr";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import CategoryTable from "../components/Tables/CategoryTable";
import TableOne from "../components/Tables/TableOne";
import TableThree from "../components/Tables/TableThree";
import TableTwo from "../components/Tables/TableTwo";
import DefaultLayout from "../layout/DefaultLayout";
import CategoryForm from "./Form/CategoryForm";
import { fetcher } from "../service/fetchconfig";

const Category = () => {
  const { data: catData, error: catError, mutate } = useSWR(
    `https://localhost:7137/api/Category`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );
  console.log(catData)
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />

      <div className="flex flex-col gap-10 lg:flex-row">
        <CategoryTable catList = {catData} onCategoryDeleted={()=>mutate()} />
        <CategoryForm onCateogryCreated={()=>mutate()} />
      </div>
    </DefaultLayout>
  );
};

export default Category;
