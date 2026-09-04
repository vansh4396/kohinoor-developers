class FrameLoader {
  constructor() {
    this.cache = new Map(); // url -> HTMLImageElement
    this.maxCacheSize = window.innerWidth < 768 ? 60 : 120; // smaller cache for mobile
    this.loading = new Set(); // urls currently loading
  }

  // Preload a sequence of frames, prioritizing closest ones
  preload(urls, currentIndex) {
    // Sort urls by distance to currentIndex
    const sortedUrls = [...urls].sort((a, b) => {
      const distA = Math.abs(urls.indexOf(a) - currentIndex);
      const distB = Math.abs(urls.indexOf(b) - currentIndex);
      return distA - distB;
    });

    // Only preload up to maxCacheSize frames ahead/behind
    const urlsToLoad = sortedUrls.slice(0, this.maxCacheSize);
    
    // Evict far away frames
    this.evict(urlsToLoad);

    urlsToLoad.forEach(url => {
      if (!this.cache.has(url) && !this.loading.has(url)) {
        this.loadImage(url);
      }
    });
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      if (this.cache.has(url)) {
        resolve(this.cache.get(url));
        return;
      }

      this.loading.add(url);
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, img);
        this.loading.delete(url);
        resolve(img);
      };
      img.onerror = (e) => {
        this.loading.delete(url);
        reject(e);
      };
      img.src = url;
    });
  }

  // Clean up cache to prevent memory leaks, especially on mobile
  evict(keepUrls) {
    const keepSet = new Set(keepUrls);
    for (const [url, img] of this.cache.entries()) {
      if (!keepSet.has(url)) {
        img.src = ''; // help GC
        this.cache.delete(url);
      }
    }
  }

  getFrame(url) {
    return this.cache.get(url) || null;
  }
}

export const frameLoader = new FrameLoader();
