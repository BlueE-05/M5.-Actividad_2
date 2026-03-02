import "./index.css";
import { useMemo } from "react";
import CharacterDetail from "./components/CharacterDetail";
import { useCharacters } from "./hooks/useCharacter";

function App() {
  const { filteredCharacters, characters, loading, error } = useCharacters("");

  const stats = useMemo(() => {
    return {
      totalCharacters: characters.length,
      filteredCharacters: filteredCharacters.length,
    };
  }, [characters.length, filteredCharacters.length]);

  return (
    <>
      // add a loader when loading
      <h1>Simpsons API Explorer</h1>
      <CharacterDetail {...stats} />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
