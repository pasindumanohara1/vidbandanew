
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import { TMDBMedia } from '../types';
import { VIEW_ALL_MAP } from '../constants';
import MediaCard from '../components/MediaCard';
import Ad728 from '../components/Ad728';
import SocialBar from '../components/SocialBar';

const ViewAllPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [items, setItems] = useState<TMDBMedia[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const config = category ? VIEW_ALL_MAP[category] : null;

  useEffect(() => {
    const loadItems = async () => {
      if (!config) return;
      setLoading(true);
      try {
        const data = await tmdbService.getByEndpoint(config.endpoint, page);
        setItems(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
    window.scrollTo(0, 0);
  }, [category, page, config]);

  if (!config) return <div className="pt-24 text-center">Category not found</div>;

  return (
    <div className="pt-24 min-h-screen px-4 md:px-8 max-w-7xl mx-auto pb-20">
        <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            {config.title}
          </h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
            Browse through the latest cinematic selection
          </p>
        </div>
      </div>

      <Ad728 id="ad-728-viewall-top" />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] skeleton rounded-2xl glass-card" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {items.map((item) => (
              <MediaCard key={item.id} item={item} type={config.type === 'all' ? undefined : config.type} />
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-8">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-10 py-3 glass rounded-2xl text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-blue-600/10 hover:border-blue-600/30 transition-all border border-white/10 text-white"
            >
              Previous
            </button>
            <span className="text-blue-500 font-black text-sm tabular-nums">
              {page} / {Math.min(totalPages, 500)}
            </span>
            <button 
              disabled={page === totalPages || page === 500}
              onClick={() => setPage(p => p + 1)}
              className="px-10 py-3 glass rounded-2xl text-xs font-black uppercase tracking-widest disabled:opacity-20 hover:bg-blue-600/10 hover:border-blue-600/30 transition-all border border-white/10 text-white"
            >
              Next
            </button>
          </div>
        </>
      )}

      <SocialBar id="social-bar-viewall" />
    </div>
  );
};

export default ViewAllPage;
