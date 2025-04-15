import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUserInformation: (userObj) => {
        set({ user: userObj });
      },

      removeUserInformation: () => {
        set({ user: null });
      },
    }),
    {
      name: "local-storage", 
    },
  ),
);

export default useUserStore;
