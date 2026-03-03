import "./index.css";
import { useMemo } from "react";
import CharacterDetail from "./components/CharacterDetail";
import LocationDetail from "./components/LocationDetail";
import EpisodeDetail from "./components/EpisodeDetail";
import { useCharacters } from "./hooks/useCharacter";
import { useLocations } from "./hooks/useLocation";
import { useEpisodes } from "./hooks/useEpisode";
import { LoaderCircle } from "lucide-react";

function App() {
  const filteringText = "";
  const {
    filteredCharacters,
    characters,
    loading: loadingCharacters,
    error: charactersError,
  } = useCharacters(filteringText);

  const {
    filteredLocations,
    locations,
    loading: loadingLocations,
    error: locationsError,
  } = useLocations(filteringText);

  const {
    filteredEpisodes,
    episodes,
    loading: loadingEpisodes,
    error: episodesError,
  } = useEpisodes(filteringText);

  const stats = useMemo(() => {
    return {
      totalCharacters: characters.length,
      filteredCharacters: filteredCharacters.length,
      totalLocations: locations.length,
      filteredLocations: filteredLocations.length,
      totalEpisodes: episodes.length,
      filteredEpisodes: filteredEpisodes.length,
    };
  }, [
    characters,
    filteredCharacters,
    locations,
    filteredLocations,
    episodes,
    filteredEpisodes,
  ]);

  const loading = loadingCharacters || loadingLocations || loadingEpisodes;
  const error = charactersError || locationsError || episodesError;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Simpsons API Explorer</h1>

      <p>
        Total Characters: {stats.totalCharacters} | Showing Characters:{" "}
        {stats.filteredCharacters} <br />
        Total Locations: {stats.totalLocations} | Showing Locations:{" "}
        {stats.filteredLocations} <br />
        Total Episodes: {stats.totalEpisodes} | Showing Episodes:{" "}
        {stats.filteredEpisodes}
      </p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharacters.map((character) => (
            <li key={character.id} className="flex justify-center">
              <CharacterDetail {...character} />
            </li>
          ))}
          {filteredLocations.map((location) => (
            <li key={location.id} className="flex justify-center">
              <LocationDetail {...location} />
            </li>
          ))}
          {filteredEpisodes.map((episode) => (
            <li key={episode.id} className="flex justify-center">
              <EpisodeDetail {...episode} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
