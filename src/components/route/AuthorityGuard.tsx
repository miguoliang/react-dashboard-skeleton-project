import React from "react";
import { Navigate } from "react-router-dom";
import useAuthority from "utils/hooks/useAuthority";

export type AuthorityGuardType = {
  userAuthority?: string[];
  authority?: string[];
  children: React.ReactElement;
};

const AuthorityGuard = (props: AuthorityGuardType) => {
  const { userAuthority = [], authority = [], children } = props;

  const roleMatched = useAuthority(userAuthority, authority);

  return <div>{roleMatched ? children : <Navigate to="/access-denied" />}</div>;
};

export default AuthorityGuard;
