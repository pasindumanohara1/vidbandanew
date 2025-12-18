
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDBMedia } from '../types';
import MediaCard from './MediaCard';

interface SectionRowProps {
  title: string;
  items: TMDBMedia[];
  type?: 'movie' | 'tv';
  viewAllKey?: string;
}

const SectionRow: React.FC<SectionRowProps> = ({ title, items, type, viewAllKey }) => {
  const navigate = useNavigate();
  if (items.length === 0) return null;

  const handleViewAll = () => {
    if (viewAllKey) {
      navigate(`/view/${viewAllKey}`);
    } else {
      navigate(`/search?query=${encodeURIComponent(title)}`);
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <h2 className="text-xl font-black tracking-tight text-white uppercase">
            {title}
          </h2>
        </div>
        <button 
          onClick={handleViewAll}
          className="text-[11px] font-bold text-slate-400 hover:text-blue-400 transition-all uppercase tracking-widest px-3 py-1.5 hover:bg-blue-600/10 rounded-lg border border-transparent hover:border-blue-600/20 active:scale-95"
        >
          View All
        </button>
      </div>
      <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 md:px-8 pb-6 snap-inline touch-pan-x">
        {items.map((item) => (
          <div key={item.id} className="snap-item w-[140px] sm:w-[170px] flex-shrink-0">
            <MediaCard item={item} type={type} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionRow;
