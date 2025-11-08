import type { AnimeSearchResponse, Anime } from "@/types/anime";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SearchCache {
  private cache = new Map<string, CacheEntry<AnimeSearchResponse>>();
  private detailCache = new Map<number, CacheEntry<Anime>>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.TTL;
  }

  getCacheKey(query: string, page: number): string {
    return `${query.toLowerCase().trim()}_${page}`;
  }

  getSearch(query: string, page: number): AnimeSearchResponse | null {
    const key = this.getCacheKey(query, page);
    const entry = this.cache.get(key);

    if (!entry) return null;
    if (this.isExpired(entry.timestamp)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  setSearch(query: string, page: number, data: AnimeSearchResponse): void {
    const key = this.getCacheKey(query, page);
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  getDetail(id: number): Anime | null {
    const entry = this.detailCache.get(id);

    if (!entry) return null;
    if (this.isExpired(entry.timestamp)) {
      this.detailCache.delete(id);
      return null;
    }

    return entry.data;
  }

  setDetail(id: number, data: Anime): void {
    this.detailCache.set(id, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
    this.detailCache.clear();
  }

  getStats() {
    return {
      searchCacheSize: this.cache.size,
      detailCacheSize: this.detailCache.size,
    };
  }
}

export const searchCache = new SearchCache();
