
import React from 'react';
import { Link } from 'react-router-dom';
import { TMDBPerson } from '../types';
import { TMDB_IMAGE_BASE } from '../constants';

interface PersonCardProps {
  person: TMDBPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const profileUrl = person.profile_path ? `${TMDB_IMAGE_BASE}${person.profile_path}` : 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=500&auto=format&fit=crop';

  return (
    <Link 
      to={`/person/${person.id}`}
      className="group block w-full transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl glass border border-white/10 group-hover:border-blue-500/50 shadow-lg">
        <img 
          src={profileUrl} 
          alt={person.name} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-blue-600/90 px-2.5 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-[0.15em] backdrop-blur-md ring-1 ring-white/20 shadow-lg">
          {person.known_for_department}
        </div>
      </div>
      <div className="mt-3 px-1">
        <h3 className="text-[13px] font-black text-white uppercase line-clamp-1 group-hover:text-blue-400 transition-colors tracking-tight">
          {person.name}
        </h3>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5 opacity-80">Actor</p>
      </div>
    </Link>
  );
};

export default PersonCard;
