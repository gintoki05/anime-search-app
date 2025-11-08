/* eslint-disable react-hooks/exhaustive-deps */
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
import AnimatedBackground from "@/components/AnimatedBackground";

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
  const debouncedSearchTerm = useDebounce(inputValue, 500);
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

    // Create NEW AbortController untuk request ini
    const controller = new AbortController();
    cancelRef.current = controller;

    dispatch(setSearchQuery(debouncedSearchTerm));
    setSearchParams({ q: debouncedSearchTerm, page: "1" });
    setCurrentPage(1);

    // Dispatch dengan signal baru (jangan abort dulu!)
    dispatch(
      searchAnime({
        query: debouncedSearchTerm,
        page: 1,
        signal: controller.signal,
      })
    );

    return () => {
      controller.abort(); // ← Cleanup saat effect di-run ulang
    };
  }, [debouncedSearchTerm]);

  // ✅ EFFECT 2: Handle pagination ONLY
  useEffect(() => {
    if (!searchQuery.trim()) return;

    // Create NEW AbortController
    const controller = new AbortController();
    cancelRef.current = controller;

    setSearchParams({ q: searchQuery, page: currentPage.toString() });

    dispatch(
      searchAnime({
        query: searchQuery,
        page: currentPage,
        signal: controller.signal,
      })
    );

    return () => {
      controller.abort(); // ← Cleanup saat effect di-run ulang
    };
  }, [currentPage, searchQuery]);

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
    <div className="relative min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:bg-gray-950 overflow-hidden">
      {/* Subtle Sakura Petals Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="animate-scale-in">
          <SearchHeader />
        </div>
        <div className="mb-8">
          <SearchBar value={inputValue} onChange={handleInputChange} />
        </div>

        {error && <ErrorAlert message={error} />}

        {/* ✅ PRIORITAS 1: Loading animation (tampil PERTAMA saat searching) */}
        {searchLoading && <LoadingAnimation message="Searching anime..." />}

        {/* PRIORITAS 2: Empty state (jika input kosong & tidak sedang loading) */}
        {!searchLoading && !error && !inputValue.trim() && <EmptyState />}

        {/* PRIORITAS 3: No results (jika search selesai & hasil kosong) */}
        {!searchLoading &&
          !error &&
          inputValue.trim() &&
          searchQuery === inputValue && // ✅ Pastikan selaras
          searchQuery.trim() && // ✅ Pastikan ada
          searchResults.length === 0 && <NoResults />}

        {/* PRIORITAS 4: Results grid (jika ada hasil) */}
        {!searchLoading && searchResults.length > 0 && (
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
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
