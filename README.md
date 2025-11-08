# 🎌 Anime Search App

A React + TypeScript single page application to search and explore anime using the free Jikan API.

## Tech Stack

- React 18 + Hooks only
- TypeScript
- Vite (dev server fixed at port 4000)
- Redux Toolkit (state management)
- React Router v6
- Axios (API client with cancellation)
- Tailwind CSS + shadcn/ui (UI components)
- lucide-react (icons)
- DotLottie React (animations)

## Run Locally (Required Submission Format)

```bash
npm install
npm run dev
```

Dev server: http://localhost:4000

No environment variables required.

## Features (Core)

- Instant search with 250ms debounce
- Server-side pagination (20 items / page)
- Request cancellation (AbortController) to prevent race conditions
- Two pages: Search + Detail
- Detail view shows metadata (score, episodes, status, aired, genres, studios, synopsis)
- Robust loading, empty, no-results, and error states
- Strong TypeScript typing (shared types in src/types/anime.ts)

## State Shape (Redux)

```ts
interface AnimeState {
  searchResults: Anime[];
  selectedAnime: Anime | null;
  searchLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    totalItems: number;
  };
  searchQuery: string;
}
```

## Project Structure

```
src/
  components/
    search/ (header, empty state, error, grid, etc.)
    detail/ (layout, back bar, error, not found)
    AnimeCard.tsx
    Pagination.tsx
    LoadingSkeleton.tsx
    LoadingSpinner.tsx
    ThemeProvider.tsx
    ThemeToggle.tsx
    ErrorBoundary.tsx
    ui/ (shadcn/ui primitives)
  pages/
    SearchPage.tsx
    DetailPage.tsx
  store/
    animeSlice.ts
    store.ts
  hooks/
    useDebounce.ts
    useAppDispatch.ts
    useAppSelector.ts
  services/
    animeApi.ts
  types/
    anime.ts
  lib/
    cache.ts
  App.tsx
  main.tsx
  index.css
public/
  lottie/
    empty.json
```

## API Usage

- Search: GET https://api.jikan.moe/v4/anime?q={query}&page={page}&limit=20
- Detail: GET https://api.jikan.moe/v4/anime/{id}
- All without auth.

## Bonus Implementation

Implemented optional enhancements beyond core requirements:

### User Experience Enhancements

1. **Dark Mode Toggle** - Theme switcher with localStorage persistence, accessible from search header
2. **Skeleton Loaders** - Animated placeholder cards during initial search (LoadingSkeleton component)
3. **Image Lazy Loading with Blur** - Progressive image loading with blur-up effect in AnimeCard
4. **Empty State with Lottie Animation** - Engaging animated illustration for empty state using DotLottie (`public/lottie/empty.json`)
5. **Empty State vs No Results** - Distinct messaging for "no search yet" vs "no results found"
6. **Responsive Grid** - Adaptive layout (1→5 columns) based on screen size
7. **URL State Sync** - Search query and page persist in URL for shareable links
8. **Modular Components** - Page decomposition into reusable search/_ and detail/_ subcomponents

### Technical Excellence

9. **Request Cancellation** - AbortController integration to prevent race conditions
10. **Result Caching** - 5-minute TTL cache (Map-based) to reduce redundant API calls
11. **Rate Limit Handling** - Axios interceptor detects 429 responses with retry-after messaging
12. **Error Boundary** - React error boundary catches crashes with fallback UI and reload option
13. **Strong TypeScript** - Separated domain types (src/types/anime.ts), minimal 'any' usage
14. **Clean Architecture** - Services, hooks, store, and components properly separated
15. **Dual Loading States** - Separate `searchLoading` and `detailLoading` for precise UX feedback
16. **Dark Mode Support** - Full theme support across all pages and components
17. **Consistent UI System** - shadcn/ui + Tailwind utilities with glass morphism effects
18. **Clear Error Surfaces** - Distinct error handling for search vs detail contexts
19. **Back Navigation** - Componentized BackBar with history preservation

## Error Handling

- Network failures surfaced via Alert component
- Abort/cancel ignored (not treated as error)
- Missing anime ID shows NotFoundSection
- Generic fallback messages when API fields absent
- Rate limit (429) detected and displayed with retry guidance

## Debounce + Cancellation Pattern

```ts
const debounced = useDebounce(inputValue, 250);
useEffect(() => {
  if (!debounced.trim()) {
    dispatch(clearSearchResults());
    return;
  }
  controllerRef.current?.abort();
  controllerRef.current = new AbortController();
  dispatch(
    searchAnime({
      query: debounced,
      page: 1,
      signal: controllerRef.current.signal,
    })
  );
}, [debounced]);
```

## Scripts

```json
{
  "scripts": {
    "dev": "vite --port 4000",
    "build": "vite build",
    "preview": "vite preview --port 4000"
  }
}
```

## AI Collaboration

See PROMPTS.md for documented AI-assisted steps (ChatGPT 5 Web, Claude Sonnet 4.5, GPT-5 Agent Mode, Claude Haiku 4.5).

## Submission Checklist

- ✅ npm install / npm run dev works
- ✅ Port 4000
- ✅ No env vars
- ✅ Core features implemented
- ✅ Bonus features implemented (14+ items)
- ✅ Bonus section documented
- ✅ Dark mode support
- ✅ Error boundary
- ✅ Result caching
- ✅ Rate limit handling
- ✅ Lottie animations

Last Updated: November 2025
