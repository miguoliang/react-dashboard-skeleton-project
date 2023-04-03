import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { AdaptableCard, Container } from "components/shared";
import FormStep from "./components/FormStep";
import { getForm, setFormData, setStepStatus } from "./store/dataSlice";
import { setCurrentStep } from "./store/stateSlice";
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { injectReducer } from "store";

injectReducer("accountDetailForm", reducer);

const PersonalInformation = lazy(
  () => import("./components/PersonalInformation")
);
const Identification = lazy(() => import("./components/Identification"));
const AddressInformation = lazy(
  () => import("./components/AddressInformation")
);
const FinancialInformation = lazy(
  () => import("./components/FinancialInformation")
);
const AccountReview = lazy(() => import("./components/AccountReview"));

const DetailForm = () => {
  const dispatch = useAppDispatch();
  const stepStatus = useAppSelector(
    (state) => state.accountDetailForm.data.stepStatus
  );
  const currentStep = useAppSelector(
    (state) => state.accountDetailForm.state.currentStep
  );
  const formData = useAppSelector(
    (state) => state.accountDetailForm.data.formData
  );

  useEffect(() => {
    dispatch(getForm());
  }, []);

  const handleNextChange = (values: string[], name: string) => {
    const nextStep = currentStep + 1;
    dispatch(setFormData({ [name]: values }));
    dispatch(
      setStepStatus({
        [currentStep]: { status: "complete" },
        [nextStep]: { status: "current" },
      })
    );
    dispatch(setCurrentStep(nextStep));
  };

  const handleBackChange = () => {
    const previousStep = currentStep - 1;
    dispatch(setCurrentStep(previousStep));
  };

  const currentStepStatus = useMemo(
    () => stepStatus[currentStep].status,
    [stepStatus, currentStep]
  );

  return (
    <Container className="h-full">
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
          {currentStep !== 4 && (
            <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2">
              <FormStep
                currentStep={currentStep}
                currentStepStatus={currentStepStatus}
                stepStatus={stepStatus}
              />
            </div>
          )}
          <div
            className={
              currentStep !== 4
                ? "2xl:col-span-4 lg:col-span-3 xl:col-span-2"
                : "lg:col-span-5"
            }
          >
            <Suspense fallback={<></>}>
              {currentStep === 0 && (
                <PersonalInformation
                  data={formData.personalInformation}
                  onNextChange={handleNextChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 1 && (
                <Identification
                  data={formData.identification}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 2 && (
                <AddressInformation
                  data={formData.addressInformation}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 3 && (
                <FinancialInformation
                  data={formData.financialInformation}
                  onNextChange={handleNextChange}
                  onBackChange={handleBackChange}
                  currentStepStatus={currentStepStatus}
                />
              )}
              {currentStep === 4 && <AccountReview />}
            </Suspense>
          </div>
        </div>
      </AdaptableCard>
    </Container>
  );
};

export default DetailForm;
