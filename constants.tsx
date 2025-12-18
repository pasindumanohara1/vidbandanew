
import React from 'react';

export const TMDB_API_KEY = 'aa4f947818d885e4addb8684a408dbaf';
export const TMDB_READ_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTRmOTQ3ODE4ZDg4NWU0YWRkYjg2ODRhNDA4ZGJhZiIsIm5iZiI6MTc0MjE2MDg1NC44NjMwMDAyLCJzdWIiOiI2N2Q3NDNkNjE5MTg2OGM1NGZmMWE3ZTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XtAFXOqSCManan03Rq_6Iguf-Nkk8QaLQvgDFZXSHr8';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';

export const SERVERS = [
  'https://vidfast.pro',
  'https://vidfast.in',
  'https://vidfast.io',
  'https://vidfast.me',
  'https://vidfast.net',
  'https://vidfast.pm',
  'https://vidfast.xyz',
  'https://2embed.top'
];

export const VIEW_ALL_MAP: Record<string, { title: string, endpoint: string, type: 'movie' | 'tv' | 'all' }> = {
  'trending': { title: 'Trending Now', endpoint: '/trending/all/day', type: 'all' },
  'popular-movies': { title: 'Popular Movies', endpoint: '/movie/popular', type: 'movie' },
  'popular-tv': { title: 'Popular TV Shows', endpoint: '/tv/popular', type: 'tv' },
  'top-rated-movies': { title: 'Top Rated Movies', endpoint: '/movie/top_rated', type: 'movie' },
  'upcoming': { title: 'Upcoming Movies', endpoint: '/movie/upcoming', type: 'movie' },
  'top-rated-tv': { title: 'Top Rated TV Shows', endpoint: '/tv/top_rated', type: 'tv' },
  'now-playing': { title: 'Now Playing', endpoint: '/movie/now_playing', type: 'movie' }
};

export const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
  10759: 'Action & Adventure', 10762: 'Kids', 10763: 'News', 10764: 'Reality',
  10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics'
};
