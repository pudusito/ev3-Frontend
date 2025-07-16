import { useState, useEffect , useRef} from 'react';

export default function MusicPlayer() {

    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
      audioRef.current = new Audio('/music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      // Reproducir automáticamente al cargar
      audioRef.current.play().catch(error => {console.log("La reproducción automática fue bloqueada por el navegador", error);setIsPlaying(false);});

        return () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      };
    }, []);

    const togglePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button 
          onClick={togglePlayPause}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: isPlaying ? '#ff4d4d' : '#4CAF50',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    );
}

/*
import { useEffect } from 'react';

export default function MusicPlayer() {
  useEffect(() => {
    const audio = new Audio('/public assets/music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}
*/