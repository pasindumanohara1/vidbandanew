
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { TMDBMedia } from '../types';
import SectionRow from '../components/SectionRow';
import Ad728 from '../components/Ad728';
import SocialBar from '../components/SocialBar';
import { TMDB_BACKDROP_BASE } from '../constants';

const HomePage: React.FC = () => {
  const [trending, setTrending] = useState<TMDBMedia[]>([]);
  const [popularMovies, setPopularMovies] = useState<TMDBMedia[]>([]);
  const [popularTV, setPopularTV] = useState<TMDBMedia[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<TMDBMedia[]>([]);
  const [upcoming, setUpcoming] = useState<TMDBMedia[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<TMDBMedia[]>([]);
  const [nowPlaying, setNowPlaying] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trend, pm, ptv, trm, up, trtv, np] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getPopular('movie'),
          tmdbService.getPopular('tv'),
          tmdbService.getTopRated('movie'),
          tmdbService.getUpcoming(),
          tmdbService.getTopRated('tv'),
          tmdbService.getNowPlaying()
        ]);

        setTrending(trend);
        setPopularMovies(pm);
        setPopularTV(ptv);
        setTopRatedMovies(trm);
        setUpcoming(up);
        setTopRatedTV(trtv);
        setNowPlaying(np);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        <SocialBar id="social-bar-home" />
      </div>
    );
  }

  const featured = trending[0];

  return (
    <div className="pb-10">
      {/* Hero Section */}
      {featured && (
        <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden mb-12">
          <img 
            src={`${TMDB_BACKDROP_BASE}${featured.backdrop_path}`} 
            className="absolute inset-0 w-full h-full object-cover"
            alt={featured.title || featured.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-end px-4 md:px-8 pb-20 max-w-7xl mx-auto">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg shadow-blue-600/30 uppercase tracking-[0.2em]">Featured Selection</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
                {featured.title || featured.name}
              </h1>
              <p className="text-slate-300 text-sm md:text-lg line-clamp-3 max-w-xl font-medium leading-relaxed opacity-90">
                {featured.overview}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link to={`/${featured.media_type}/${featured.id}`} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 active:scale-95">
                  Watch Now
                </Link>
                <Link to={`/${featured.media_type}/${featured.id}`} className="glass text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                  View Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rows */}
      <div className="space-y-6">
        <Ad728 id="ad-728-trending" />
        <SectionRow title="Trending Now" items={trending} viewAllKey="trending" />

        <Ad728 id="ad-728-popular-movies" />
        <SectionRow title="Popular Movies" items={popularMovies} type="movie" viewAllKey="popular-movies" />

        <Ad728 id="ad-728-popular-tv" />
        <SectionRow title="Popular TV Shows" items={popularTV} type="tv" viewAllKey="popular-tv" />

        <Ad728 id="ad-728-top-rated-movies" />
        <SectionRow title="Top Rated Movies" items={topRatedMovies} type="movie" viewAllKey="top-rated-movies" />

        <Ad728 id="ad-728-upcoming" />
        <SectionRow title="Upcoming" items={upcoming} type="movie" viewAllKey="upcoming" />

        <Ad728 id="ad-728-top-rated-tv" />
        <SectionRow title="Top Rated TV Shows" items={topRatedTV} type="tv" viewAllKey="top-rated-tv" />

        <Ad728 id="ad-728-now-playing" />
        <SectionRow title="Now Playing" items={nowPlaying} type="movie" viewAllKey="now-playing" />
      </div>
    </div>
  );
};

export default HomePage;
