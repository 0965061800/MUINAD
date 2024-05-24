import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import Buttons from '../../pages/UiElements/Buttons';
import { Link } from 'react-router-dom';


const ProductTable = ({products = []}) => {
  console.log(products);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Brand</p>
        </div>
        <div className="col-span-2 flex items-center">
        </div>
      </div>

      {products.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.productName}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.categoryName}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.productPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.Active ? "active":"none active"}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.brandName}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <Link
              to="/ProductDetail"
              className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Detail
            </Link>
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded-full bg-meta-3 ml-1 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Edit
            </Link>
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded-full bg-red-400 ml-1 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
