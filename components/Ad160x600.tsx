import React, { useEffect, useRef, useState } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';

const AD_KEY = 'f71f875ea4a8542f58b7b99d640aaa34';
const AD_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const Ad160x600: React.FC<{ id?: string }> = ({ id = 'ad-160x600' }) => {
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
              height: 600,
              width: 160,
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
    <div className="hidden lg:block w-[160px] px-4 py-4">
      <div id={id} ref={containerRef} className="flex items-center justify-center cursor-pointer" onClick={() => recordClick(id)}>
        <div style={{ width: 160, height: inView ? 600 : 0 }} />
      </div>
      <div className="mt-3 bg-white/10 text-white/90 text-center py-2 rounded-md border border-white/5">
        <span className="text-[12px] font-bold uppercase">Ad: 160x600</span>
      </div>
    </div>
  );
};

export default Ad160x600;
