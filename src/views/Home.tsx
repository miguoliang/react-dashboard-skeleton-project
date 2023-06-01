import { PayPalButtons } from "@paypal/react-paypal-js";
import { Container } from "components/shared";

const Home = () => {
  return (
    <Container>
      <h1>Home</h1>
      {/*<PayPalButtons*/}
      {/*  createSubscription={(data, actions) => {*/}
      {/*    return actions.subscription.create({*/}
      {/*      plan_id: "P-2WT48350SH384763JMR2Y6JQ",*/}
      {/*      custom_id: "custom-value",*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  onApprove={(data, actions) => {*/}
      {/*    return actions.subscription!.get().then((details) => {*/}
      {/*      console.log(details);*/}
      {/*      alert("Subscription completed");*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}
    </Container>
  );
};

export default Home;
