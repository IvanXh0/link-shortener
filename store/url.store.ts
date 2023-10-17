import { create } from "zustand";

interface UrlStore {
  urls: string[];
  addUrl: (url: string) => void;
  removeUrl: (url: string) => void;
  getUrls: () => string[];
}

const userUrlStore = create<UrlStore>((set, get) => ({
  urls: [],
  addUrl: (url) =>
    set((state) => ({
      urls: [...state.urls, url],
    })),
  removeUrl: (url) =>
    set((state) => ({
      urls: state.urls.filter((u) => u !== url),
    })),
  getUrls: () => get().urls,
}));

export default userUrlStore;
