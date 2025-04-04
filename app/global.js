// import { create } from "zustand";

// const useStore = create((set) => ({
//   user: null, // Default value

//   setUser: (user) => {
//     if (typeof window !== "undefined") {  // Ensure localStorage is accessible
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//     set({ user });
//   },

//   loadUser: () => {
//     if (typeof window !== "undefined") {  // Prevent server-side execution
//       const storedUser = JSON.parse(localStorage.getItem("user")) || null;
//       set({ user: storedUser });
//     }
//   }
// }));

// export default useStore;
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
