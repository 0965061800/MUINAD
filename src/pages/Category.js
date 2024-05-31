import useSWR from "swr";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableOne from "../components/Tables/TableOne";
import TableThree from "../components/Tables/TableThree";
import TableTwo from "../components/Tables/TableTwo";
import DefaultLayout from "../layout/DefaultLayout";
import CategoryCreate from "../components/Category/CategoryCreate";
import { fetcher } from "../service/fetchconfig";
import CategoryTable from "../components/Category/CategoryTable";
import CategoryEdit from "../components/Category/CategoryEdit";
import { useState } from "react";

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

  const [action, setAction] = useState("create");
  const [catId, setCatId] = useState();

  const onChangeToEditAction = (id) => {
    setAction("edit");
    setCatId(id);
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />
      
      <div className="flex flex-col gap-10 lg:flex-row">
        <CategoryTable catList = {catData} onCategoryDeleted={()=>mutate()} changeToCreateAction={() => setAction("create")} changeToEditAction={onChangeToEditAction} />
        {action === "create" 
          ? <CategoryCreate onCateogryCreated={()=>mutate()} />
          : <CategoryEdit onCategoryEdited={()=>mutate()} catId = {catId} />
        }
      </div>
    </DefaultLayout>
  );
};

export default Category;
