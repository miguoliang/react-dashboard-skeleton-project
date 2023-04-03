import React, { useEffect } from "react";
import { DoubleSidedImage, Loading } from "components/shared";
import { Notification, toast } from "components/ui";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProduct, getProduct, updateProduct } from "./store/dataSlice";
import ProductForm from "views/sales/ProductForm";
import isEmpty from "lodash/isEmpty";
import { useAppDispatch, useAppSelector } from "store/hooks";

injectReducer("salesProductEdit", reducer);

const ProductEdit = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const productData = useAppSelector(
    (state) => state.salesProductEdit.data.productData,
  );
  const loading = useAppSelector(
    (state) => state.salesProductEdit.data.loading,
  );

  const fetchData = (data: any) => {
    dispatch(getProduct(data));
  };

  const handleFormSubmit = async (
    values: any,
    setSubmitting: (_: boolean) => void,
  ) => {
    setSubmitting(true);
    const success = await updateProduct(values);
    setSubmitting(false);
    if (success) {
      popNotification("updated");
    }
  };

  const handleDiscard = () => {
    navigate("/app/sales/product-list");
  };

  const handleDelete = async (setDialogOpen: (arg0: boolean) => void) => {
    setDialogOpen(false);
    await deleteProduct({ id: productData.id });
    popNotification("deleted");
  };

  const popNotification = (keyword: string) => {
    toast.push(
      <Notification
        title={`Successfully ${keyword}`}
        type="success"
        duration={2500}
      >
        Product successfully {keyword}
      </Notification>,
      {
        placement: "top-center",
      },
    );
    navigate("/app/sales/product-list");
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1,
    );
    const requestParam = { id: path };
    fetchData(requestParam);
  }, [location.pathname]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(productData) && (
          <>
            <ProductForm
              type="edit"
              initialData={productData}
              onFormSubmit={handleFormSubmit}
              onDiscard={handleDiscard}
              onDelete={handleDelete}
            />
          </>
        )}
      </Loading>
      {!loading && isEmpty(productData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No product found!"
          />
          <h3 className="mt-8">No product found!</h3>
        </div>
      )}
    </>
  );
};

export default ProductEdit;
