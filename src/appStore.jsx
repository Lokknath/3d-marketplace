import { create } from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set(() => ({ dopen })),

  user: null,
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
});

appStore = persist(appStore, { name: "evk3d_store" });
export const useAppStore = create(appStore);
