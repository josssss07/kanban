
import { create } from "zustand";
import supabase from "./supabaseclient";

const useStore = create((set) => ({
  user: null,

  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user });
  },

  loadUser: () => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) set({ user: storedUser });
    }
  },

  fetchUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // persist
      set({ user });
    }
  },
}));

export default useStore;
