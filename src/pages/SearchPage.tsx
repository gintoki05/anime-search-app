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
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import { LoadingAnimation } from "@/components/LoadingAnimation";

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
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [inputValue, setInputValue] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const debouncedSearchTerm = useDebounce(inputValue, 250);
  const cancelRef = useRef<AbortController | null>(null);

  // ✅ EFFECT 1: Handle input changes & debounced search
  useEffect(() => {
    // Jika input kosong, clear semua
    if (!debouncedSearchTerm.trim()) {
      cancelRef.current?.abort();
      dispatch(clearSearchResults());
      dispatch(setSearchQuery(""));
      setSearchParams({});
      setCurrentPage(1);
      return;
    }

    // User typed something, trigger search
    cancelRef.current?.abort();
    cancelRef.current = new AbortController();

    dispatch(setSearchQuery(debouncedSearchTerm));
    setSearchParams({ q: debouncedSearchTerm, page: "1" });
    setCurrentPage(1);

    dispatch(
      searchAnime({
        query: debouncedSearchTerm,
        page: 1,
        signal: cancelRef.current.signal,
      })
    );

    return () => cancelRef.current?.abort();
  }, [debouncedSearchTerm, dispatch, setSearchParams]);

  // ✅ EFFECT 2: Handle pagination ONLY (triggered by button/URL)
  useEffect(() => {
    if (!searchQuery.trim() || currentPage === 1) return;

    cancelRef.current?.abort();
    cancelRef.current = new AbortController();

    setSearchParams({ q: searchQuery, page: currentPage.toString() });

    dispatch(
      searchAnime({
        query: searchQuery,
        page: currentPage,
        signal: cancelRef.current.signal,
      })
    );

    return () => cancelRef.current?.abort();
  }, [currentPage, searchQuery, dispatch, setSearchParams]);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setCurrentPage(1);
    cancelRef.current?.abort();
  };

  const handlePageChange = (page: number) => {
    if (!searchQuery.trim()) return;
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <SearchHeader />
      <div className="mb-8">
        <SearchBar value={inputValue} onChange={handleInputChange} />
      </div>

      {error && <ErrorAlert message={error} />}

      {/* ✅ Tampilkan loading animation saat searching (PRIORITAS UTAMA) */}
      {searchLoading && inputValue.trim() && (
        <LoadingAnimation message="Searching anime..." />
      )}

      {/* Jika tidak loading & tidak error & input kosong */}
      {!searchLoading && !error && !inputValue.trim() && <EmptyState />}

      {/* Jika tidak loading & tidak error & input ada & hasil kosong */}
      {!searchLoading &&
        !error &&
        inputValue.trim() &&
        searchResults.length === 0 && <NoResults />}

      {/* Jika ada hasil */}
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
