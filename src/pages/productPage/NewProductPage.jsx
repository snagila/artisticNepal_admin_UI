import React from "react";
import NewProductForm from "../../components/productPage/NewProductForm";

const NewProductPage = () => {
  const initialFormData = {
    category: "",
    name: "",
    price: "",
    quantity: "",
    sku: "",
    description: "",
    status: "",
    salesPrice: "",
    salesStartDate: "",
    salesEndDate: "",
  };
  return (
    <>
      <NewProductForm initialFormData={initialFormData} />
    </>
  );
};

export default NewProductPage;
