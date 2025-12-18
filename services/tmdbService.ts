
import { TMDB_BASE_URL, TMDB_READ_TOKEN } from '../constants';
import { TMDBMedia, TMDBDetail, MediaType } from '../types';

const fetchTMDB = async (endpoint: string, params: Record<string, string | number> = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));
  
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_READ_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
};

export const tmdbService = {
  getTrending: async (type: 'all' | 'movie' | 'tv' = 'all') => {
    const data = await fetchTMDB(`/trending/${type}/day`);
    return data.results as TMDBMedia[];
  },

  getPopular: async (type: MediaType) => {
    const data = await fetchTMDB(`/${type}/popular`);
    return data.results as TMDBMedia[];
  },

  getTopRated: async (type: MediaType) => {
    const data = await fetchTMDB(`/${type}/top_rated`);
    return data.results as TMDBMedia[];
  },

  getUpcoming: async () => {
    const data = await fetchTMDB('/movie/upcoming');
    return data.results as TMDBMedia[];
  },

  getNowPlaying: async () => {
    const data = await fetchTMDB('/movie/now_playing');
    return data.results as TMDBMedia[];
  },

  getDetails: async (type: MediaType, id: number): Promise<TMDBDetail> => {
    return fetchTMDB(`/${type}/${id}`, { append_to_response: 'credits,recommendations,videos' });
  },

  searchMulti: async (query: string, page: number = 1) => {
    return fetchTMDB('/search/multi', { query, page });
  },

  searchType: async (type: MediaType, query: string, page: number = 1) => {
    return fetchTMDB(`/search/${type}`, { query, page });
  },

  getByEndpoint: async (endpoint: string, page: number = 1) => {
    return fetchTMDB(endpoint, { page });
  }
};
