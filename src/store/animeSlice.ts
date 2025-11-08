import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AnimeState } from "../types/anime";
import { animeApi } from "../services/animeApi";

const initialState: AnimeState = {
  searchResults: [],
  selectedAnime: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    totalItems: 0,
  },
  searchQuery: "",
};

export const searchAnime = createAsyncThunk(
  "anime/searchAnime",
  async (
    {
      query,
      page = 1,
      signal,
    }: { query: string; page?: number; signal?: AbortSignal },
    thunkAPI
  ) => {
    const abortSignal = signal ?? thunkAPI.signal;
    const response = await animeApi.searchAnime(query, page, abortSignal);
    return response;
  }
);

export const fetchAnimeById = createAsyncThunk(
  "anime/fetchAnimeById",
  async (id: number, thunkAPI) => {
    const response = await animeApi.getAnimeById(id, thunkAPI.signal);
    return response.data;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.pagination = initialState.pagination;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.current_page,
          totalPages: action.payload.pagination.last_visible_page,
          hasNextPage: action.payload.pagination.has_next_page,
          totalItems: action.payload.pagination.items.total,
        };
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        // Ignore cancellation errors to avoid noisy UI states during fast typing
        const msg = action.error.message || "Failed to search anime";
        if (
          msg.toLowerCase().includes("abort") ||
          msg.toLowerCase().includes("cancel")
        ) {
          state.error = null;
        } else {
          state.error = msg;
        }
      })
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime details";
      });
  },
});

export const { setSearchQuery, clearSearchResults, clearSelectedAnime } =
  animeSlice.actions;
export default animeSlice.reducer;
