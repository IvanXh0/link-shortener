interface UrlStore {
  urls: string[];
  addUrl: (url: string) => void;
  removeUrls: () => void;
  getUrls: () => string[];
}

class xStore implements UrlStore {
  urls: string[] = [];
  addUrl(url: string) {
    this.urls.push(url);
  }
  removeUrls() {
    this.urls = [];
  }
  getUrls() {
    return this.urls;
  }
}

const store = new xStore();

const userUrlStore = {
  getState() {
    return store;
  },
};

export default userUrlStore;
