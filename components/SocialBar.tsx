import React, { useEffect, useRef } from 'react';
import { recordImpression, recordClick } from '../services/adAnalytics';

const SCRIPT_SRC = 'https://pl28345290.effectivegatecpm.com/b9/f5/b0/b9f5b008814c31e04a5d2f0fc3c15d4b.js';

const SocialBar: React.FC<{ id?: string }> = ({ id = 'social-bar' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    const el = ref.current || document.getElementById(id) || document.body;
    if (!el) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !injectedRef.current) {
          injectedRef.current = true;
          try {
            const s = document.createElement('script');
            s.src = SCRIPT_SRC;
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

    // fallback
    try {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      el.appendChild(s);
      recordImpression(id);
    } catch (e) {}
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div id={id} ref={ref} className="flex items-center justify-center cursor-pointer" onClick={() => recordClick(id)}>
        <div className="w-full max-w-[980px] bg-white/5 rounded-xl py-6 px-4 flex items-center justify-center">
          <div className="text-center">
            <div style={{ height: 48 }} className="mx-auto mb-3" />
            <div className="text-[12px] font-bold text-white/90 uppercase">Social Bar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialBar;
