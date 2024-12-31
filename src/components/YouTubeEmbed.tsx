import React from 'react';

interface YouTubeEmbedProps {
  volume: number;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ volume }) => {
  // Lofi music playlist for reading
  const videoId = 'jfKfPfyJRdk';
  
  return (
    <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&loop=1&playlist=${videoId}&volume=${volume / 100}`}
        title="YouTube music player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};