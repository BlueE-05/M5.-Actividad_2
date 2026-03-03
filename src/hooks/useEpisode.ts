import { useEffect, useMemo, useState } from "react";
import { fetchEpisodes, type Episode } from "../lib/api";

export function useEpisodes(searchTerm: string) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEpisodes() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchEpisodes();
        if (active) setEpisodes(data);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Error al cargar episodios",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadEpisodes();

    return () => {
      active = false;
    };
  }, []);

  const filteredEpisodes = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return episodes;

    return episodes.filter((episode) =>
      episode.name.toLowerCase().includes(normalized),
    );
  }, [episodes, searchTerm]);

  return {
    episodes,
    filteredEpisodes,
    loading,
    error,
  };
}
