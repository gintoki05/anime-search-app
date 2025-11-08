import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchAnimeById, clearSelectedAnime } from "../store/animeSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import AnimatedBackground from "@/components/AnimatedBackground";
import { BackBar } from "@/components/detail/BackBar";
import { ErrorSection } from "@/components/detail/ErrorSection";
import { NotFoundSection } from "@/components/detail/NotFoundSection";
import { AnimeLayout } from "@/components/detail/AnimeLayout";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, detailLoading, error } = useAppSelector(
    (s) => s.anime
  );

  useEffect(() => {
    if (id) dispatch(fetchAnimeById(Number(id)));
    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  if (detailLoading)
    return (
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[50vh]">
            <LoadingSpinner message="Loading anime details..." />
          </div>
        </div>
      </div>
    );

  if (error)
    return <ErrorSection message={error} onBack={() => navigate("/")} />;

  if (!selectedAnime) return <NotFoundSection onBack={() => navigate("/")} />;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <BackBar onBack={() => navigate(-1)} />
        <AnimeLayout anime={selectedAnime} />
      </div>
    </div>
  );
};

export default DetailPage;
