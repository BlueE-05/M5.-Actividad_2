import "./index.css";
import { useMemo, useState } from "react";
import CharacterDetail from "./components/CharacterDetail";
import LocationDetail from "./components/LocationDetail";
import EpisodeDetail from "./components/EpisodeDetail";
import { useCharacters } from "./hooks/useCharacter";
import { useLocations } from "./hooks/useLocation";
import { useEpisodes } from "./hooks/useEpisode";
import { LoaderCircle } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("characters"); // State to manage active tab

  const [filteringText, setFilteringText] = useState("");
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

  const renderContent = () => {
    if (loading) {
      return <LoaderCircle className="animate-spin" />;
    }

    if (error) {
      return <p style={{ color: "red" }}>Error: {error}</p>;
    }

    switch (activeTab) {
      case "characters":
        return filteredCharacters.map((character) => (
          <li key={character.id} className="flex justify-center">
            <CharacterDetail {...character} />
          </li>
        ));
      case "locations":
        return filteredLocations.map((location) => (
          <li key={location.id} className="flex justify-center">
            <LocationDetail {...location} />
          </li>
        ));
      case "episodes":
        return filteredEpisodes.map((episode) => (
          <li key={episode.id} className="flex justify-center">
            <EpisodeDetail {...episode} />
          </li>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">Simpsons API Explorer</h1>

      {/* Tab Bar for Selection */}
      <div className="mb-6">
        <div className="relative flex w-fit bg-gray-100 p-1 rounded-2xl">
          {/* Animated Background Indicator */}
          <span
            className={`absolute top-1 bottom-1 w-32 rounded-xl bg-gray-800 transition-all duration-300 ease-in-out
        ${activeTab === "characters" && "translate-x-0"}
        ${activeTab === "locations" && "translate-x-full"}
        ${activeTab === "episodes" && "translate-x-[200%]"}
      `}
          />

          {/* Characters Tab */}
          <button
            onClick={() => setActiveTab("characters")}
            className={`relative z-10 w-32 px-4 py-2 rounded-xl font-medium transition-colors duration-300
        ${
          activeTab === "characters"
            ? "text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
          >
            Characters
          </button>

          {/* Locations Tab */}
          <button
            onClick={() => setActiveTab("locations")}
            className={`relative z-10 w-32 px-4 py-2 rounded-xl font-medium transition-colors duration-300
        ${
          activeTab === "locations"
            ? "text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
          >
            Locations
          </button>

          {/* Episodes Tab */}
          <button
            onClick={() => setActiveTab("episodes")}
            className={`relative z-10 w-32 px-4 py-2 rounded-xl font-medium transition-colors duration-300
        ${
          activeTab === "episodes"
            ? "text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
          >
            Episodes
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={filteringText}
          onChange={(e) => setFilteringText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Content */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderContent()}
      </ul>
    </div>
  );
}

export default App;
