import React, { useEffect, useRef, useState } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';

const AD_KEY = '239861832e3b1642e89becae3b0978ff';
const AD_SRC = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`;

const Ad468x60: React.FC<{ id?: string }> = ({ id = 'ad-468x60' }) => {
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
              height: 60,
              width: 468,
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
    <div id={id} ref={containerRef} className="flex items-center justify-center cursor-pointer" onClick={() => recordClick(id)}>
      <div style={{ width: inView ? 468 : 0, height: inView ? 60 : 0 }} />
      <div className="sr-only">Ad 468x60</div>
    </div>
  );
};

export default Ad468x60;
