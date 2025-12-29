import React, { useEffect, useRef, useState } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';
import Ad320x50 from './Ad320x50';

const AD_KEY = 'ac236b54f4167ecf7cea58fee5e894e0';
const AD_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const Ad728: React.FC<{ id?: string }> = ({ id = 'ad-728' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const injectedRef = useRef(false);

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
              height: 90,
              width: 728,
              params: {}
            };

            const s = document.createElement('script');
            s.src = AD_SRC;
            s.async = true;
            el.appendChild(s);
            recordImpression(id);
          } catch (e) {
            // ignore
          }
        }
      });
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(onIntersect, { rootMargin: '200px' });
      obs.observe(el);
      return () => obs.disconnect();
    }

    // fallback: inject immediately
    onIntersect([{ isIntersecting: true } as any]);
  }, [id]);

  return (
    <div className="w-full flex justify-center px-4 md:px-8 py-6">
      <div id={id} ref={containerRef} className="flex items-center justify-center cursor-pointer">
        <div className="hidden sm:block" style={{ width: 728, height: inView ? 90 : 0 }} onClick={() => recordClick(id)} />
        <div className="block sm:hidden" onClick={() => recordClick(id)}>
          <Ad320x50 id={`${id}-320`} />
        </div>
      </div>

      <div className="mt-3 mx-auto max-w-[728px] bg-white/10 text-white/90 text-center py-2 rounded-md border border-white/5">
        <span className="text-[12px] font-bold uppercase">Ad: Banner</span>
      </div>
    </div>
  );
};

export default Ad728;
