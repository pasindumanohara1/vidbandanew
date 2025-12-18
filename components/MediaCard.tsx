
import React from 'react';
import { Link } from 'react-router-dom';
import { TMDBMedia } from '../types';
import { TMDB_IMAGE_BASE } from '../constants';
import RatingBadge from './RatingBadge';

interface MediaCardProps {
  item: TMDBMedia;
  type?: 'movie' | 'tv';
}

const MediaCard: React.FC<MediaCardProps> = ({ item, type }) => {
  const mediaType = type || item.media_type || 'movie';
  const title = item.title || item.name;
  const posterUrl = item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop';
  const year = (item.release_date || item.first_air_date || '').substring(0, 4);

  return (
    <Link 
      to={`/${mediaType}/${item.id}`}
      className="group block w-full transition-transform duration-300 hover:scale-105 active:scale-95"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl glass border border-white/10 group-hover:border-blue-500/50 shadow-lg transition-colors duration-300">
        <img 
          src={posterUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-70 group-hover:scale-110"
          loading="lazy"
        />
        <RatingBadge rating={item.vote_average} />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
           </div>
        </div>
      </div>
      
      <div className="mt-3 px-1 space-y-0.5">
        <h3 className="text-[13px] font-black text-white uppercase line-clamp-1 group-hover:text-blue-400 transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-80">
          {year || 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default MediaCard;
