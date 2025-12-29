
import React from 'react';
import Ad728 from './Ad728';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/5 py-12 px-4 text-center glass-blue">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-4">
          <Ad728 id="ad-728-footer" />
        </div>
        <p className="text-3xl font-black text-blue-500 tracking-tighter">VIDBANDA</p>
        <p className="text-sm text-slate-500">
          Vidbanda © 2025 Vidbanda. All rights reserved.
        </p>
        <div className="pt-4 space-y-2">
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            This site uses the TMDb API but is not endorsed or certified by TMDb.
            Streaming functionality provided by 3rd-party embed services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
