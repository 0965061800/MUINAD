import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import CategoryTable from '../components/Tables/CategoryTable';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';

const Category = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default Category;
