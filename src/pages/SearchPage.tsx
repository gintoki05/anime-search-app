import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useDebounce } from "../hooks/useDebounce";
import {
  searchAnime,
  setSearchQuery,
  clearSearchResults,
} from "../store/animeSlice";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";

import { SearchHeader } from "@/components/search/SearchHeader";
import { ErrorAlert } from "@/components/search/ErrorAlert";
import { EmptyState } from "@/components/search/EmptyState";
import { NoResults } from "@/components/search/NoResults";
import { ResultsInfo } from "@/components/search/ResultsInfo";
import { ResultsGrid } from "@/components/search/ResultsGrid";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { searchResults, searchLoading, error, pagination, searchQuery } =
    useAppSelector((s) => s.anime);

  const queryParam = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(queryParam);
  const debouncedSearchTerm = useDebounce(inputValue, 250);
  const cancelRef = useRef<AbortController | null>(null);

  // We already seed initial inputValue from queryParam in useState.
  // Removing the syncing effect avoids the bug where clearing the input repopulates the last query
  // because the old URL param lingers until debounce clears it.

  // Handle user typing (including immediate clear) separate from debounced search effect.
  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val === "") {
      // Abort any in‑flight request and clear state immediately (don't wait for debounce)
      cancelRef.current?.abort();
      dispatch(clearSearchResults());
      dispatch(setSearchQuery(""));
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      cancelRef.current?.abort();
      cancelRef.current = new AbortController();
      dispatch(setSearchQuery(debouncedSearchTerm));

      // Update URL params
      setSearchParams({ q: debouncedSearchTerm, page: "1" });

      dispatch(
        searchAnime({
          query: debouncedSearchTerm,
          page: 1,
          signal: cancelRef.current.signal,
        })
      );
    } else {
      dispatch(clearSearchResults());
      setSearchParams({});
    }
    return () => cancelRef.current?.abort();
  }, [debouncedSearchTerm, dispatch, setSearchParams]);

  const handlePageChange = (page: number) => {
    if (!searchQuery.trim()) return;
    const controller = new AbortController();
    cancelRef.current?.abort();
    cancelRef.current = controller;

    // Update URL params with new page
    setSearchParams({ q: searchQuery, page: page.toString() });

    dispatch(
      searchAnime({ query: searchQuery, page, signal: controller.signal })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SearchHeader />
      <div className="mb-8">
        <SearchBar value={inputValue} onChange={handleInputChange} />
      </div>

      {error && <ErrorAlert message={error} />}

      {searchLoading && !searchResults.length && <LoadingSkeleton />}

      {!searchLoading && !error && !inputValue.trim() && <EmptyState />}

      {!searchLoading &&
        !error &&
        inputValue.trim() &&
        searchResults.length === 0 && <NoResults />}

      {searchResults.length > 0 && (
        <div className="space-y-6">
          <ResultsInfo pagination={pagination} searchQuery={searchQuery} />
          <ResultsGrid items={searchResults} />
          {searchLoading && searchResults.length > 0 && (
            <div className="flex justify-center py-8">
              <LoadingSpinner
                message="Loading more results..."
                className="py-4"
              />
            </div>
          )}
          {pagination.totalPages > 1 && !searchLoading && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
