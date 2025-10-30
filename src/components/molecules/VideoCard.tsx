//  libs
import clsx from "clsx"

//  props
interface Props {
  className?: string,
  videoUrl: string,
}

export default function VideoCard({ 
  className, 
  videoUrl 
}: Props) {
  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={clsx(
      'rounded-lg overflow-hidden relative',
      'aspect-[2/1]',
      'w-full',
      className
    )}>
      <iframe
        src={embedUrl}
        title="Video"
        className={clsx(
          'w-full h-full',
          'absolute top-0 left-0'
        )}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

