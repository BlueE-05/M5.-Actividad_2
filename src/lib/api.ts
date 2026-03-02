//* Type Definitions
export type Character = {
    id: number;
    age: number;
    birthdate: string;
    gender: string;
    name: string;
    occupation: string;
    portrait_path: string;
    phrases: string[];
};

export type CharacterList = {
    count: number;
    next: string | null;
    previous: string | null;
    pages: number;
    results: Character[];
};

export type Episode = {
    id: number;
    airdate: string;
    episode_number: number;
    image_path: string;
    name: string;
    season: number;
    synopsis: string;
};

export type EpisodeList = {
    count: number;
    next: string | null;
    previous: string | null;
    pages: number;
    results: Episode[];
};

export type Location = {
    id: number;
    name: string;
    image_path: string;
    town: string;
    type: string; // originally "use"
};

export type LocationList = {
    count: number;
    next: string | null;
    previous: string | null;
    pages: number;
    results: Location[];
};

//* API Functions
const API_BASE_URL = 'https://thesimpsonsapi.com/api';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchCharacters(): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/characters`);
  const characterList = await handleResponse<CharacterList>(response, 'No se pudieron cargar los personajes');
  return characterList.results;
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const response = await fetch(`${API_BASE_URL}/episodes`);
  const episodeList = await handleResponse<EpisodeList>(response, 'No se pudieron cargar los episodios');
  return episodeList.results;
}

export async function fetchLocations(): Promise<Location[]> {
  const response = await fetch(`${API_BASE_URL}/locations`);
  const locationList = await handleResponse<LocationList>(response, 'No se pudieron cargar las ubicaciones');
  return locationList.results;
}