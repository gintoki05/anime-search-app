import axios, { AxiosError } from "axios";
import type { AnimeSearchResponse, Anime } from "../types/anime";
import { searchCache } from "@/lib/cache";

const BASE_URL = "https://api.jikan.moe/v4";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Add response interceptor for rate limit handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      const retrySeconds = retryAfter ? parseInt(retryAfter, 10) : 60;

      const enhancedError = new Error(
        `Rate limit exceeded. Please retry after ${retrySeconds} seconds.`
      ) as Error & { isRateLimit: boolean; retryAfter: number };

      enhancedError.isRateLimit = true;
      enhancedError.retryAfter = retrySeconds;

      return Promise.reject(enhancedError);
    }
    return Promise.reject(error);
  }
);

export const animeApi = {
  /**
   * Search anime with server-side pagination.
   * Supports request cancellation via AbortSignal to avoid race conditions on fast typing.
   * Results are cached for 5 minutes to reduce API calls.
   */
  searchAnime: async (
    query: string,
    page: number = 1,
    signal?: AbortSignal
  ): Promise<AnimeSearchResponse> => {
    // Check cache first
    const cached = searchCache.getSearch(query, page);
    if (cached) {
      // Add small delay untuk menunjukkan loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      return cached;
    }

    const response = await api.get(`/anime`, {
      params: {
        q: query,
        page,
        limit: 20,
      },
      signal,
    });

    // Cache the result
    searchCache.setSearch(query, page, response.data);

    return response.data;
  },

  /** Fetch a single anime detail by MAL id. Results cached for 5 minutes. */
  getAnimeById: async (
    id: number,
    signal?: AbortSignal
  ): Promise<{ data: Anime }> => {
    // Check cache first
    const cached = searchCache.getDetail(id);
    if (cached) {
      // Add small delay untuk menunjukkan loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { data: cached };
    }

    const response = await api.get(`/anime/${id}`, { signal });

    // Cache the result
    searchCache.setDetail(id, response.data.data);

    return response.data;
  },
};
