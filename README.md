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

### 🎨 Creative "WOW" Factor UI Enhancements

20. **Sakura Petal Animation** - Subtle floating sakura petals (20 petals) that gently fall across the screen with rotation, creating authentic anime atmosphere without being distracting
21. **Glassmorphism Search Bar** - Enhanced search bar with frosted glass effect, backdrop blur, and smooth hover shadow that elevates on interaction
22. **3D Card Tilt Effect** - Anime cards respond to mouse movement with real-time 3D rotation (perspective transform), creating magnetic hover effect with depth perception
23. **Parallax Scrolling** - Detail page images and content move at different speeds during scroll, creating depth illusion and premium feel
24. **Stagger Grid Animation** - Search results animate in sequentially with 50ms delay between each card, creating cascading entrance effect
25. **Shimmer Loading Effect** - Image placeholders use animated gradient shimmer (not static pulse) that moves across the placeholder
26. **Gradient Score Badges** - Score badges with yellow-to-orange gradient backgrounds and enhanced shadow on hover
27. **Info Reveal on Hover** - Cards show "Click to view details →" badge at bottom when hovered, replacing distracting play buttons
28. **Gradient Text Effects** - Section titles use gradient text (background-clip: text) with soft color combinations (indigo→purple→pink)
29. **Enhanced Borders** - Cards use colorful 2px borders (indigo/purple/pink/blue variants) with shadow glows matching the border color
30. **Decorative Corner Accents** - Subtle gradient corner decorations in card content areas
31. **Scale & Fade Transitions** - Page elements use scale-in and fade-up animations with opacity keyframes for smooth reveals
32. **Hover Indicator Bar** - Bottom gradient bar (indigo→purple→pink) appears on card hover with smooth opacity transition
33. **Modern Minimalist Background** - Clean gray-50/gray-950 background that puts focus on content while sakura petals add anime charm
34. **Smooth Micro-interactions** - All interactive elements have refined 300ms transitions for professional feel

### Animation Specifications

- **Sakura Fall**: Gentle downward movement (0.2-0.7px/frame) with horizontal drift and rotation for natural petal motion
- **Shimmer**: 2s infinite linear gradient animation moving 1000px across surface
- **Fade In Up**: 0.6s ease-out with 30px vertical translate and opacity 0→1
- **Scale In**: 0.5s ease-out with scale 0.9→1 and opacity 0→1
- **3D Tilt**: Real-time perspective(1000px) transform with rotateX/Y based on mouse position
- **Stagger Delay**: 50ms increment per grid item (index × 0.05s)
- **Hover Transitions**: 300ms duration with ease timing for smooth, professional interactions

### Color Palette Enhancements

- **Primary Gradients**: Indigo 500/600 → Purple 500/600 → Pink 500/600
- **Accent Gradients**: Yellow 500 → Orange 500 (score badges)
- **Background**: Clean gray-50 (light) / gray-950 (dark) for modern minimalist look
- **Sakura Petals**: Soft pink (rgba(255, 182, 193, 0.6)) with gentle fade
- **Glass Effects**: rgba(255,255,255,0.1) with 10px blur + 180% saturation (light mode)
- **Border Glows**: Box-shadow with color/20 opacity, subtle spread for depth

All animations use CSS keyframes with smooth easing functions and are GPU-accelerated via transform/opacity properties for 60fps performance. Design philosophy: Modern, minimalist, anime-inspired with purposeful animations that enhance rather than distract.

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
