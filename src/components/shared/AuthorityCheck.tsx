import useAuthority from "utils/hooks/useAuthority";
import { AuthorityGuardType } from "../route/AuthorityGuard";

const AuthorityCheck = (props: AuthorityGuardType) => {
  const { userAuthority = [], authority = [], children } = props;

  const roleMatched = useAuthority(userAuthority, authority);

  return roleMatched ? children : <></>;
};

export default AuthorityCheck;
