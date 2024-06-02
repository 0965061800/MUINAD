import React, { useState } from "react";
import ProductSkuTable from "./ProductSkuTable";
import ProductSkuEdit from "./ProductSkuEdit";
import ProductSkuCreate from "./ProductSkuCreate";

const ProductSku = ({ productSkus = [] , productId, onChangeSku = f => f}) => {
  const [skuTarget, setSkuTarget] = useState();
  const [action, setAction] = useState("create");

  const onChangeEdit = (value) => {
    setSkuTarget(value);
    setAction("edit");
  }

  return (
    <div className="flex gap-5">
      <div className="w-3/4">
        <ProductSkuTable
          productSkus={productSkus}
          onClickEdit={(value) => onChangeEdit(value)}
          onClickCreate={() => setAction("create")}
          onChangeSku={onChangeSku}
        ></ProductSkuTable>
      </div>
      {action === "create" ? (
        <ProductSkuCreate productId={productId}></ProductSkuCreate>
      ) : (
          <ProductSkuEdit skuId={skuTarget} onChangeSku={onChangeSku}></ProductSkuEdit>
      )}
    </div>
  );
};

export default ProductSku;
