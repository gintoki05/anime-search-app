import { useState, useEffect, useRef } from "react";
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
  const dispatch = useAppDispatch();
  const { searchResults, loading, error, pagination, searchQuery } =
    useAppSelector((s) => s.anime);
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 250);
  const cancelRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      cancelRef.current?.abort();
      cancelRef.current = new AbortController();
      dispatch(setSearchQuery(debouncedSearchTerm));
      dispatch(
        searchAnime({
          query: debouncedSearchTerm,
          page: 1,
          signal: cancelRef.current.signal,
        })
      );
    } else {
      dispatch(clearSearchResults());
    }
    return () => cancelRef.current?.abort();
  }, [debouncedSearchTerm, dispatch]);

  const handlePageChange = (page: number) => {
    if (!searchQuery.trim()) return;
    const controller = new AbortController();
    cancelRef.current?.abort();
    cancelRef.current = controller;
    dispatch(
      searchAnime({ query: searchQuery, page, signal: controller.signal })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SearchHeader />
      <div className="mb-8">
        <SearchBar value={inputValue} onChange={setInputValue} />
      </div>

      {error && <ErrorAlert message={error} />}

      {loading && !searchResults.length && <LoadingSkeleton />}

      {!loading && !error && !inputValue.trim() && <EmptyState />}

      {!loading &&
        !error &&
        inputValue.trim() &&
        searchResults.length === 0 && <NoResults />}

      {searchResults.length > 0 && (
        <div className="space-y-6">
          <ResultsInfo pagination={pagination} searchQuery={searchQuery} />
          <ResultsGrid items={searchResults} />
          {loading && searchResults.length > 0 && (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          )}
          {pagination.totalPages > 1 && !loading && (
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
