import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import mockServer from "./mock";
import appConfig from "./configs/app.config";
import "./locales";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { paypalConfig } from "./configs/paypal.config";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { chakraTheme } from "./configs/chakra.config";

const environment = import.meta.env.NODE_ENV;

/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
if (environment !== "production" && appConfig.enableMock) {
  mockServer({ environment });
}

function App() {
  return (
    <ChakraBaseProvider theme={chakraTheme}>
      <PayPalScriptProvider options={paypalConfig}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PayPalScriptProvider>
    </ChakraBaseProvider>
  );
}

export default App;
