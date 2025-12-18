
import React, { useState, useEffect } from 'react';
import { MyListItem } from '../types';
import MediaCard from '../components/MediaCard';

const MyListPage: React.FC = () => {
  const [items, setItems] = useState<MyListItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'rating'>('date');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('vidbanda_mylist') || '[]');
    setItems(saved);
  }, []);

  const filteredItems = items
    .filter(item => filter === 'all' || item.type === filter)
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.addedAt - a.addedAt;
    });

  return (
    <div className="pt-24 min-h-screen px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">MY LIBRARY</h1>
          <p className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mt-2">{items.length} Curated Titles</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
            {(['all', 'movie', 'tv'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900/60 border border-white/10 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black outline-none uppercase tracking-widest cursor-pointer hover:border-blue-500/30 transition-all appearance-none pr-10 relative backdrop-blur-xl"
          >
            <option value="date">Sort By: Recent</option>
            <option value="title">Sort By: Name</option>
            <option value="rating">Sort By: Score</option>
          </select>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mb-32">
          {filteredItems.map((item) => (
            <MediaCard 
              key={item.id} 
              item={{
                id: item.id,
                title: item.title,
                name: item.title,
                poster_path: item.poster,
                vote_average: item.rating,
                overview: '',
                backdrop_path: null,
                media_type: item.type
              }} 
              type={item.type}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-48 glass rounded-[3rem] border border-dashed border-white/10">
          <div className="mb-8 inline-flex p-8 rounded-full bg-blue-600/10 text-blue-500 shadow-2xl shadow-blue-600/5">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">Your Library is Empty</h2>
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs opacity-60">Begin your collection by exploring the cinema.</p>
        </div>
      )}
    </div>
  );
};

export default MyListPage;
