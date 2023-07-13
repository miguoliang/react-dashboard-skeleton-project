import { create } from "zustand";
import { User, UserManager } from "oidc-client-ts";
import { SIGN_OUT_URL, userManager } from "../configs/oidc.config";

interface UseAuth {
  isAuthenticated: boolean;
  user?: User;
  userManager: UserManager;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user?: User) => void;
  signOut: () => void;
}

export const useAuth = create<UseAuth>((set) => ({
  isAuthenticated: false,
  userManager,
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user?: User) => set({ user }),
  signOut: () => {
    window.location.replace(SIGN_OUT_URL);
  },
}));
