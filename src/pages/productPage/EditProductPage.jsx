import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewProductForm from "../../components/productPage/NewProductForm";

const EditProductPage = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const productToEdit = products?.find((product) => product._id === id);

  const productData = {
    _id: productToEdit._id,
    category: productToEdit.category,
    name: productToEdit.name,
    price: productToEdit.price,
    quantity: productToEdit.quantity,
    sku: productToEdit.sku,
    description: productToEdit.description,
    status: productToEdit.status,
    salesPrice: productToEdit.salesPrice,
    salesStartDate: productToEdit.salesStartDate
      ? format(new Date(productToEdit?.salesStartDate), "yyyy-MM-dd", "")
      : "",
    salesEndDate: productToEdit.salesEndDate
      ? format(new Date(productToEdit?.salesEndDate), "yyyy-MM-dd", "")
      : "",
    uploadedImages: productToEdit.images,
  };

  return (
    <>
      <NewProductForm productData={productData} />
    </>
  );
};

export default EditProductPage;
