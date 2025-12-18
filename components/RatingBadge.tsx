
import React from 'react';

interface RatingBadgeProps {
  rating: number;
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  const getColor = (val: number) => {
    if (val >= 8) return 'bg-emerald-500/80 text-white ring-1 ring-white/20';
    if (val >= 6) return 'bg-blue-500/80 text-white ring-1 ring-white/20';
    return 'bg-amber-500/80 text-white ring-1 ring-white/20';
  };

  return (
    <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-black backdrop-blur-md shadow-lg z-10 ${getColor(rating)}`}>
      {rating > 0 ? rating.toFixed(1) : 'NR'}
    </div>
  );
};

export default RatingBadge;
