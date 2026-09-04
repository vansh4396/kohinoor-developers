class FrameLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();

    this.queue = [];
    this.queued = new Set();

    this.activeLoads = 0;

    // Controlled network concurrency.
    this.maxConcurrent =
      window.innerWidth < 768 ? 3 : 5;

    // Keep memory usage bounded.
    this.maxCacheSize =
      window.innerWidth < 768 ? 35 : 60;
  }

  /**
   * Load one frame.
   */
  loadImage(url, priority = 0) {
    // Already decoded and cached.
    if (this.cache.has(url)) {
      return Promise.resolve(
        this.cache.get(url)
      );
    }

    // Already downloading.
    if (this.loading.has(url)) {
      return this.loading.get(url);
    }

    // Create one shared promise for this URL.
    const promise = new Promise(
      (resolve, reject) => {
        this.queue.push({
          url,
          priority,
          resolve,
          reject,
        });

        this.queued.add(url);

        this.sortQueue();
        this.processQueue();
      }
    );

    this.loading.set(url, promise);

    return promise;
  }

  /**
   * Highest priority first.
   */
  sortQueue() {
    this.queue.sort(
      (a, b) => a.priority - b.priority
    );
  }

  /**
   * Start queued downloads while concurrency
   * limit allows.
   */
  processQueue() {
    while (
      this.activeLoads <
      this.maxConcurrent &&
      this.queue.length > 0
    ) {
      const item = this.queue.shift();

      if (!item) {
        break;
      }

      const {
        url,
        resolve,
        reject,
      } = item;

      this.queued.delete(url);

      /*
       * It may have been loaded while waiting
       * in the queue.
       */
      if (this.cache.has(url)) {
        this.loading.delete(url);

        resolve(
          this.cache.get(url)
        );

        continue;
      }

      this.activeLoads++;

      const img = new Image();

      /*
       * Let the browser decode asynchronously.
       */
      img.decoding = 'async';

      img.onload = () => {
        this.activeLoads--;

        this.loading.delete(url);

        this.cache.set(url, img);

        resolve(img);

        this.evict();

        this.processQueue();
      };

      img.onerror = (error) => {
        this.activeLoads--;

        this.loading.delete(url);

        reject(error);

        this.processQueue();
      };

      img.src = url;
    }
  }

  /**
   * Queue frames around the current position.
   *
   * The current frame always receives the highest
   * priority.
   */
  preload(
    urls,
    currentIndex,
    direction = 1
  ) {
    const total = urls.length;

    /*
     * 1. Current frame.
     */
    if (urls[currentIndex]) {
      this.loadImage(
        urls[currentIndex],
        -10000
      );
    }

    /*
     * 2. Frames immediately ahead.
     *
     * Small enough to avoid flooding the browser,
     * large enough to provide a useful buffer.
     */
    const forwardCount = 24;

    for (
      let distance = 1;
      distance <= forwardCount;
      distance++
    ) {
      const index =
        currentIndex +
        direction * distance;

      if (
        index < 0 ||
        index >= total
      ) {
        continue;
      }

      this.loadImage(
        urls[index],
        distance
      );
    }

    /*
     * 3. Smaller buffer behind.
     */
    const backwardCount = 8;

    for (
      let distance = 1;
      distance <= backwardCount;
      distance++
    ) {
      const index =
        currentIndex -
        direction * distance;

      if (
        index < 0 ||
        index >= total
      ) {
        continue;
      }

      this.loadImage(
        urls[index],
        100 + distance
      );
    }
  }

  /**
   * Keep memory usage under control.
   *
   * Map insertion order acts as a simple FIFO cache.
   */
  evict() {
    while (
      this.cache.size >
      this.maxCacheSize
    ) {
      const oldestKey =
        this.cache.keys().next().value;

      if (!oldestKey) {
        break;
      }

      const img =
        this.cache.get(oldestKey);

      if (img) {
        img.src = '';
      }

      this.cache.delete(oldestKey);
    }
  }

  /**
   * Get an already decoded frame.
   */
  getFrame(url) {
    return (
      this.cache.get(url) || null
    );
  }
}

export const frameLoader =
  new FrameLoader();