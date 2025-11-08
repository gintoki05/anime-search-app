import axios from "axios";
import type { AnimeSearchResponse, Anime } from "../types/anime";

const BASE_URL = "https://api.jikan.moe/v4";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const animeApi = {
  /**
   * Search anime with server-side pagination.
   * Supports request cancellation via AbortSignal to avoid race conditions on fast typing.
   */
  searchAnime: async (
    query: string,
    page: number = 1,
    signal?: AbortSignal
  ): Promise<AnimeSearchResponse> => {
    const response = await api.get(`/anime`, {
      params: {
        q: query,
        page,
        limit: 20,
      },
      signal,
    });
    return response.data;
  },

  /** Fetch a single anime detail by MAL id */
  getAnimeById: async (
    id: number,
    signal?: AbortSignal
  ): Promise<{ data: Anime }> => {
    const response = await api.get(`/anime/${id}`, { signal });
    return response.data;
  },
};
