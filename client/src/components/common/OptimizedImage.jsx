import React, { useState } from 'react';

const FALLBACK_WEDDING_IMAGE = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80";

const OptimizedImage = ({
  src,
  alt = 'Indian Destination Wedding',
  className = '',
  aspectRatio = 'aspect-[4/3]',
  onClick
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = error || !src ? FALLBACK_WEDDING_IMAGE : src;

  return (
    <div className={`relative overflow-hidden bg-rose-blush/20 ${aspectRatio} ${className}`} onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-rose-blush/10 via-champagne/30 to-rose-blush/10 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};

export default OptimizedImage;
