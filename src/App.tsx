import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import mockServer from "./mock";
import appConfig from "./configs/app.config";
import "./locales";
import { AuthProvider } from "react-oidc-context";
import { oidcConfig } from "./configs/oidc.config";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { paypalConfig } from "./configs/paypal.config";

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
    <PayPalScriptProvider options={paypalConfig}>
      <AuthProvider {...oidcConfig}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
