import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchAnimeById, clearSelectedAnime } from "../store/animeSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { BackBar } from "@/components/detail/BackBar";
import { ErrorSection } from "@/components/detail/ErrorSection";
import { NotFoundSection } from "@/components/detail/NotFoundSection";
import { AnimeLayout } from "@/components/detail/AnimeLayout";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector((s) => s.anime);

  useEffect(() => {
    if (id) dispatch(fetchAnimeById(Number(id)));
    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      </div>
    );

  if (error)
    return <ErrorSection message={error} onBack={() => navigate("/")} />;

  if (!selectedAnime) return <NotFoundSection onBack={() => navigate("/")} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackBar onBack={() => navigate(-1)} />
        <AnimeLayout anime={selectedAnime} />
      </div>
    </div>
  );
};

export default DetailPage;
