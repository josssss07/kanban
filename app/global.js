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

  // ✅ Correct way to set the user
  setUser: (user) => set({ user }), 

  // ✅ Corrected fetchUser function
  fetchUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    set({ user });  // ✅ Now correctly updates the Zustand store
  }
}));

export default useStore;

