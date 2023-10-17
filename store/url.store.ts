import { create } from "zustand";

interface UrlStore {
  urls: string[];
  addUrl: (url: string) => void;
  removeUrls: () => void;
  getUrls: () => string[];
}

const userUrlStore = create<UrlStore>((set, get) => ({
  urls: [],
  addUrl: (url) =>
    set((state) => ({
      urls: [...state.urls, url],
    })),
  removeUrls: () =>
    set(() => ({
      urls: [],
    })),
  getUrls: () => get().urls,
}));

export default userUrlStore;
