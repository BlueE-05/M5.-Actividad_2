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
  }, [characters, filteredCharacters]);

  return (
    <>
      <h1>Simpsons API Explorer</h1>

      {/* Estadísticas */}
      <p>Total personajes: {stats.totalCharacters}</p>
      <p>Mostrando: {stats.filteredCharacters}</p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredCharacters.map((character) => (
            <li key={character.id}>
              <CharacterDetail {...character} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
