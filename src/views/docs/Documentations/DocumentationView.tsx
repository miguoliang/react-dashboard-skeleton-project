import React, { Fragment, Suspense } from "react";
import { Spinner } from "components/ui";
import documentationRoutes from "./documentationRoutes";
import DocumentationWrapper from "./DocumentationWrapper";
import { Navigate, Route, Routes } from "react-router-dom";

const DocumentationView = () => {
  return (
    <Routes>
      {documentationRoutes.map((group) => (
        <Fragment key={group.groupName}>
          {group.nav.map(({ path, component: Component, key }) => (
            <Route
              key={key}
              path={path}
              element={
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center">
                      <Spinner size={40} />
                    </div>
                  }
                >
                  <DocumentationWrapper title={key}>
                    <Component />
                  </DocumentationWrapper>
                </Suspense>
              }
            />
          ))}
        </Fragment>
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default DocumentationView;
