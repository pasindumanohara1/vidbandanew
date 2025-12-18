
export type MediaType = 'movie' | 'tv' | 'person';

export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  genre_ids?: number[];
  media_type?: MediaType;
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  media_type: 'person';
  known_for?: TMDBMedia[];
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface TMDBDetail extends TMDBMedia {
  runtime?: number;
  status?: string;
  genres: Array<{ id: number; name: string }>;
  tagline?: string;
  credits?: {
    cast: TMDBActor[];
  };
  recommendations?: {
    results: TMDBMedia[];
  };
  videos?: {
    results: TMDBVideo[];
  };
}

export interface TMDBActor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MyListItem {
  id: number;
  type: MediaType;
  title: string;
  poster: string | null;
  rating: number;
  addedAt: number;
}
