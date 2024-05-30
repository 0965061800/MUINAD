import Swal from "sweetalert2";
import ProductOne from "../../images/product/product-01.png";
import ProductTwo from "../../images/product/product-02.png";
import ProductThree from "../../images/product/product-03.png";
import ProductFour from "../../images/product/product-04.png";
import Buttons from "../../pages/UiElements/Buttons";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductTable = ({ products = [] , onDelete = f => f}) => {
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://localhost:7137/api/Product/${productId}`);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        products = products.filter(p => p.productId !== productId);
        onDelete(products);
      }
    });
  }
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
        <div className="col-span-2 flex items-center ">
          <Link
            to="/create-product"
            className="inline-flex items-center justify-center rounded-full bg-black py-2 px-10 text-center font-medium text-white hover:bg-slate-500 lg:px-4 xl:px-6"
          >
            Create New
          </Link>
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
                <img src={product.productImage} alt="Product" className="w-full h-full object-cover" />
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
              {product.productPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product?.Active ? "active" : "none active"}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.brandName}</p>
          </div>
          <div className="col-span-1 flex flex-col items-center xl:flex-row">
            <Link
              to={`/products/${product.productId}`}
              className="block items-center justify-center rounded-full bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Detail
            </Link>
            <Link
              to={`/products/edit/${product.productId}`}
              className="block items-center justify-center rounded-full bg-meta-3 ml-1 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
            >
              Edit
            </Link>
            <Link
              to="#"
              className="block items-center justify-center rounded-full bg-red-400 ml-1 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6"
              onClick={() => handleDelete(product.productId)}
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
