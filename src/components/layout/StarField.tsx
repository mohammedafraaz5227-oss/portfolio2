import React from 'react';

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

// Deterministic pseudo-random generation to maintain purity during render
function generateStars(count: number): StarData[] {
  const list: StarData[] = [];
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let i = 0; i < count; i++) {
    const isCyan = pseudoRandom() < 0.22;
    list.push({
      id: i,
      x: pseudoRandom() * 100,
      y: pseudoRandom() * 100,
      size: pseudoRandom() * 2 + 0.8,
      opacity: pseudoRandom() * 0.6 + 0.2,
      duration: pseudoRandom() * 4 + 3,
      delay: pseudoRandom() * 5,
      color: isCyan ? 'rgba(34, 211, 238, 0.7)' : '#ffffff'
    });
  }
  return list;
}

const STATIC_STARS = generateStars(90);

export const StarField: React.FC = () => {
  return (
    <div className="star-field" aria-hidden="true">
      {STATIC_STARS.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: star.size > 2 ? `0 0 6px ${star.color}` : 'none',
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
      {/* Ambient Cosmic Gradients */}
      <div 
        className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div 
        className="absolute top-2/3 right-1/10 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
};
