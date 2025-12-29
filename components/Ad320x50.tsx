import React, { useEffect, useRef, useState } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';

const AD_KEY = '5d2edd3ac89c6c1954a1ef6a3db75a0c';
const AD_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const Ad320x50: React.FC<{ id?: string }> = ({ id = 'ad-320x50-sticky' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const injectedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current || document.getElementById(id) || document.body;
    if (!el) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !injectedRef.current) {
          injectedRef.current = true;
          try {
            (window as any).atOptions = {
              key: AD_KEY,
              format: 'iframe',
              height: 50,
              width: 320,
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

  if (!mounted) return null;

  return (
    <div
      id={id}
      ref={containerRef}
      className="fixed left-1/2 -translate-x-1/2 z-[999] block md:hidden cursor-pointer"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)'
      }}
      onClick={() => recordClick(id)}
    >
      <div style={{ width: 320, height: 50 }} className="mx-auto bg-transparent rounded-lg shadow-lg overflow-hidden" />
      <div className="mt-2 text-center text-[11px] text-white/90 bg-white/5 rounded-md py-1">Ad: 320x50</div>
    </div>
  );
};

export default Ad320x50;
