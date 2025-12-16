import { useState } from 'react';
import { Play, AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  toolNames: string[];
}

export function VideoPlayer({ videoUrl, toolNames }: VideoPlayerProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [error, setError] = useState(false);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\s]+)/,
      /youtube\.com\/embed\/([^?&\s]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const videoId = extractVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;

  const handleLoadError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center space-y-3">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
        <p className="text-gray-600 dark:text-gray-400">
          Video demo temporarily unavailable
        </p>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(toolNames.join(' ') + ' tutorial')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-primary-600 dark:text-primary-400 hover:underline"
        >
          Search YouTube for tutorials
        </a>
      </div>
    );
  }

  if (!showVideo) {
    return (
      <button
        onClick={() => setShowVideo(true)}
        className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center space-x-3 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-primary-600 ml-1" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-lg text-gray-900 dark:text-white">
              Watch Tutorial Video
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Learn how to integrate these tools
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={embedUrl}
        title={`${toolNames.join(' + ')} Tutorial`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={handleLoadError}
      />
    </div>
  );
}
