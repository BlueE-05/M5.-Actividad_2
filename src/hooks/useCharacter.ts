import { useEffect, useMemo, useState } from "react";
import { fetchCharacters, type Character } from "../lib/api";

export function useCharacters(searchTerm: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchCharacters();
        if (active) setCharacters(data);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Error al cargar personajes",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const filteredCharacters = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return characters;

    return characters.filter((character) =>
      character.name.toLowerCase().includes(normalized),
    );
  }, [characters, searchTerm]);

  return {
    characters,
    filteredCharacters,
    loading,
    error,
  };
}
