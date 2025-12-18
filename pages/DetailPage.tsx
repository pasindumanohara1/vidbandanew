
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { TMDBDetail, MediaType, MyListItem, TMDBVideo } from '../types';
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE, SERVERS } from '../constants';
import SectionRow from '../components/SectionRow';

const TrailerModal: React.FC<{ videoKey: string; onClose: () => void }> = ({ videoKey, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl aspect-video glass-blue rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-2xl glass flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [data, setData] = useState<TMDBDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeServer, setActiveServer] = useState(SERVERS[0]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setIframeLoaded(false);
      try {
        const details = await tmdbService.getDetails(type as MediaType, parseInt(id!));
        setData(details);
        
        const saved = JSON.parse(localStorage.getItem('vidbanda_mylist') || '[]');
        setIsSaved(saved.some((item: MyListItem) => item.id === parseInt(id!)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [type, id]);

  const toggleMyList = () => {
    if (!data) return;
    const saved = JSON.parse(localStorage.getItem('vidbanda_mylist') || '[]');
    let updated;
    if (isSaved) {
      updated = saved.filter((item: MyListItem) => item.id !== data.id);
    } else {
      updated = [{
        id: data.id,
        type: type as MediaType,
        title: data.title || data.name || 'Untitled',
        poster: data.poster_path,
        rating: data.vote_average,
        addedAt: Date.now()
      }, ...saved];
    }
    localStorage.setItem('vidbanda_mylist', JSON.stringify(updated));
    setIsSaved(!isSaved);
  };

  const scrollToPlayer = () => {
    if (playerRef.current) {
      const offset = 100;
      const elementPosition = playerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const getEmbedUrl = () => {
    if (type === 'movie') {
      return `${activeServer}/movie/${id}?autoPlay=true&theme=3B82F6`;
    }
    return `${activeServer}/tv/${id}/${season}/${episode}?autoPlay=true&theme=3B82F6`;
  };

  const trailer = data?.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {showTrailer && trailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}

      {/* Hero Backdrop */}
      <div className="relative h-[45vh] md:h-[70vh] w-full">
        <img 
          src={`${TMDB_BACKDROP_BASE}${data.backdrop_path}`} 
          className="w-full h-full object-cover"
          alt={data.title || data.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-slate-950/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 w-56 md:w-80 mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-[2.5rem] overflow-hidden glass border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.6)]">
              <img src={`${TMDB_IMAGE_BASE}${data.poster_path}`} className="w-full h-full object-cover" alt={data.title} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left pt-12 md:pt-24">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
              {data.title || data.name}
            </h1>
            {data.tagline && <p className="text-blue-500 font-black italic mb-8 tracking-wide text-xl md:text-2xl uppercase opacity-90">{data.tagline}</p>}
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-10">
              <div className="bg-blue-600 px-4 py-1.5 rounded-xl font-black text-base shadow-xl shadow-blue-600/30 ring-2 ring-white/10">
                {data.vote_average.toFixed(1)}
              </div>
              <span className="text-slate-700 font-black">•</span>
              <span className="text-white font-black uppercase tracking-widest text-sm">{(data.release_date || data.first_air_date || '').substring(0, 4)}</span>
              <span className="text-slate-700 font-black">•</span>
              <span className="text-white font-black uppercase tracking-widest text-sm">{data.runtime ? `${data.runtime} MINS` : data.status}</span>
              <div className="hidden md:flex flex-wrap gap-3">
                {data.genres.map(g => (
                  <span key={g.id} className="bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-3xl mb-12 text-lg md:text-xl font-bold opacity-80">
              {data.overview}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button 
                onClick={scrollToPlayer}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-600/40 active:scale-95 text-[11px] flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Watch Now
              </button>
              
              {trailer && (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="glass text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all border border-white/10 hover:bg-white/10 active:scale-95 text-[11px] flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Watch Trailer
                </button>
              )}

              <button 
                onClick={toggleMyList}
                className={`px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all border active:scale-95 text-[11px] ${
                  isSaved 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                    : 'glass text-white hover:bg-white/10 border-white/10'
                }`}
              >
                {isSaved ? 'In Library' : 'Add to List'}
              </button>
            </div>
          </div>
        </div>

        {/* Player Section */}
        <div id="player" ref={playerRef} className="mt-32 scroll-mt-28">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.7)]"></div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">THEATRE MODE</h2>
            </div>
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar pb-2">
              <select 
                value={activeServer} 
                onChange={(e) => {
                  setActiveServer(e.target.value);
                  setIframeLoaded(false);
                }}
                className="bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] outline-none focus:ring-4 focus:ring-blue-500/20 appearance-none min-w-[180px] cursor-pointer hover:border-blue-500/30 transition-all"
              >
                {SERVERS.map((s, idx) => (
                  <option key={s} value={s}>Server {idx + 1}</option>
                ))}
              </select>
              {type === 'tv' && (
                <div className="flex gap-4">
                  <div className="relative">
                    <span className="absolute -top-3.5 left-3 text-[10px] font-black text-blue-500 uppercase tracking-widest">Season</span>
                    <input 
                      type="number" 
                      min="1" 
                      className="w-24 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-4 py-4 rounded-2xl text-sm font-black text-center focus:ring-4 focus:ring-blue-500/20 outline-none"
                      value={season}
                      onChange={(e) => { setSeason(Math.max(1, parseInt(e.target.value) || 1)); setIframeLoaded(false); }}
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute -top-3.5 left-3 text-[10px] font-black text-blue-500 uppercase tracking-widest">Episode</span>
                    <input 
                      type="number" 
                      min="1" 
                      className="w-24 bg-slate-900/80 backdrop-blur-xl border border-white/10 px-4 py-4 rounded-2xl text-sm font-black text-center focus:ring-4 focus:ring-blue-500/20 outline-none"
                      value={episode}
                      onChange={(e) => { setEpisode(Math.max(1, parseInt(e.target.value) || 1)); setIframeLoaded(false); }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative aspect-video w-full glass-blue rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
            {/* Skeleton Loader for Player */}
            {!iframeLoaded && (
              <div className="absolute inset-0 z-20 skeleton flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-[5px] border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-8 shadow-2xl shadow-blue-500/30"></div>
                <div className="text-center space-y-3">
                  <p className="text-lg font-black text-white uppercase tracking-[0.4em] animate-pulse">Establishing Connection</p>
                  <p className="text-[11px] text-blue-400 font-black uppercase tracking-[0.3em] opacity-70">Securing {activeServer.replace('https://', '')}</p>
                </div>
              </div>
            )}
            <iframe 
              src={getEmbedUrl()}
              className={`w-full h-full transition-opacity duration-1000 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
            ></iframe>
          </div>
        </div>

        {/* Cast */}
        {data.credits?.cast && data.credits.cast.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">LEAD PERFORMANCES</h2>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-inline touch-pan-x">
              {data.credits.cast.slice(0, 18).map(actor => (
                <div key={actor.id} className="snap-item flex-shrink-0 w-40 group">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden glass border border-white/10 mb-5 transition-all duration-700 group-hover:scale-105 group-hover:border-blue-500/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                    <img 
                      src={actor.profile_path ? `${TMDB_IMAGE_BASE}${actor.profile_path}` : `https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=300&auto=format&fit=crop`} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                      alt={actor.name}
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-black text-white line-clamp-1 group-hover:text-blue-500 transition-colors uppercase tracking-tight">{actor.name}</p>
                  <p className="text-[10px] font-black text-slate-500 line-clamp-1 uppercase tracking-widest opacity-60 mt-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data.recommendations?.results && data.recommendations.results.length > 0 && (
          <div className="mt-20">
            <SectionRow title="Cinematic Matches" items={data.recommendations.results} type={type as MediaType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
