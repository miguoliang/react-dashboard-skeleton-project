import React from "react";
import ProductForm from "views/sales/ProductForm";
import { Notification, toast } from "components/ui";
import { useNavigate } from "react-router-dom";
import { apiCreateSalesProduct } from "services/SalesService";
import { Product } from "../../../mock/data/salesData";

const ProductNew = () => {
  const navigate = useNavigate();

  const addProduct = async (data: Product) => {
    const response = await apiCreateSalesProduct(data);
    return response.data;
  };

  const handleFormSubmit = async (
    values: any,
    setSubmitting: (_: boolean) => void
  ) => {
    setSubmitting(true);
    const success = await addProduct(values);
    setSubmitting(false);
    if (success) {
      toast.push(
        <Notification
          title={"Successfuly added"}
          type="success"
          duration={2500}
        >
          Product successfuly added
        </Notification>,
        {
          placement: "top-center",
        }
      );
      navigate("/app/sales/product-list");
    }
  };

  const handleDiscard = () => {
    navigate("/app/sales/product-list");
  };

  return (
    <>
      <ProductForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </>
  );
};

export default ProductNew;
