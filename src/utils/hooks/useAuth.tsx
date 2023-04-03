import { noop } from "../../components/ui/utils/constant";

function useAuth() {
  const signOut = () => {
    noop();
  };

  return {
    authenticated: true,
    signOut,
  };
}

export default useAuth;
