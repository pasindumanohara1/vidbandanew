
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { TMDBMedia, TMDBPerson, MediaType } from '../types';
import MediaCard from '../components/MediaCard';
import PersonCard from '../components/PersonCard';
import Ad728 from '../components/Ad728';
import SocialBar from '../components/SocialBar';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | MediaType>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        let data;
        if (typeFilter === 'all') {
          data = await tmdbService.searchMulti(query, page);
        } else {
          data = await tmdbService.searchType(typeFilter as MediaType, query, page);
        }
        setResults(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [query, typeFilter, page]);

  useEffect(() => {
    setPage(1);
  }, [query, typeFilter]);

  const tabs: { id: 'all' | MediaType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'movie', label: 'Movies' },
    { id: 'tv', label: 'TV Shows' },
    { id: 'person', label: 'People' }
  ];

  return (
    <div className="pt-24 min-h-screen px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
          Search Results: <span className="text-blue-500">"{query}"</span>
        </h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Page {page} of {totalPages}</p>
      </div>

      <Ad728 id="ad-728-search-top" />

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTypeFilter(tab.id)}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              typeFilter === tab.id 
                ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20' 
                : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] glass animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((item) => {
              if (item.media_type === 'person' || typeFilter === 'person') {
                return <PersonCard key={item.id} person={item as TMDBPerson} />;
              }
              return <MediaCard key={item.id} item={item as TMDBMedia} />;
            })}
          </div>

          <div className="mt-16 mb-20 flex items-center justify-center gap-6">
            <button 
              disabled={page === 1}
              onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
              className="px-8 py-3 glass rounded-2xl text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-white/10 transition-all border border-white/10"
            >
              Previous
            </button>
            <div className="h-10 w-px bg-white/10"></div>
            <button 
              disabled={page === totalPages}
              onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
              className="px-8 py-3 glass rounded-2xl text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-white/10 transition-all border border-white/10"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-40 glass rounded-3xl border border-white/5">
          <p className="text-xl text-slate-500 font-black uppercase tracking-tighter">No cinematic results found.</p>
        </div>
      )}

      <Ad728 id="ad-728-search-bottom" />
      <SocialBar id="social-bar-search" />
    </div>
  );
};

export default SearchPage;
