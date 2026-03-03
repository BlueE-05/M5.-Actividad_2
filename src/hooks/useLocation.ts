import { useEffect, useMemo, useState } from "react";
import { fetchLocations, type Location } from "../lib/api";

export function useLocations(searchTerm: string) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLocations() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchLocations();
        if (active) setLocations(data);
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

    void loadLocations();

    return () => {
      active = false;
    };
  }, []);

  const filteredLocations = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return locations;

    return locations.filter((location) =>
      location.name.toLowerCase().includes(normalized),
    );
  }, [locations, searchTerm]);

  return {
    locations,
    filteredLocations,
    loading,
    error,
  };
}
