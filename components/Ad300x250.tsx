import React, { useEffect, useRef, useState } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';

const AD_KEY = 'b7b9503357eacfd5d6a20f48a28440b7';
const AD_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const Ad300x250: React.FC<{ id?: string }> = ({ id = 'ad-300x250' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const injectedRef = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current || document.getElementById(id) || document.body;
    if (!el) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !injectedRef.current) {
          injectedRef.current = true;
          setInView(true);
          try {
            (window as any).atOptions = {
              key: AD_KEY,
              format: 'iframe',
              height: 250,
              width: 300,
              params: {}
            };
            const s = document.createElement('script');
            s.src = AD_SRC;
            s.async = true;
            el.appendChild(s);
            recordImpression(id);
          } catch (e) {}
        }
      });
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(onIntersect, { rootMargin: '200px' });
      obs.observe(el);
      return () => obs.disconnect();
    }

    onIntersect([{ isIntersecting: true } as any]);
  }, [id]);

  return (
    <div className="max-w-[320px] mx-auto md:mx-0 px-4 md:px-0 py-4">
      <div id={id} ref={containerRef} className="flex items-center justify-center cursor-pointer" onClick={() => recordClick(id)}>
        <div style={{ width: 300, height: inView ? 250 : 0 }} />
      </div>
      <div className="mt-3 bg-white/10 text-white/90 text-center py-2 rounded-md border border-white/5">
        <span className="text-[12px] font-bold uppercase">Ad: 300x250</span>
      </div>
    </div>
  );
};

export default Ad300x250;
