import { usePlayerStore } from "~/stores/player";

export function useAudioPlayer() {
  const playerStore = usePlayerStore();

  const initPlayer = (element) => {
    if (!element) {
      console.error("Плеера нет :(");
      return;
    }
    playerStore.setAudioRef(element);
  };

  const togglePlayPause = async () => {
    if (!playerStore.audioRef) {
      console.error("Плеер не инициализирован");
      return;
    }

    try {
      if (playerStore.isPlaying) {
        playerStore.audioRef.pause();
        playerStore.setPlaying(false);
      } else {
        if (playerStore.currentTrack && !playerStore.audioRef.src) {
          playerStore.audioRef.src = playerStore.currentTrack.track_file;
        }
        await playerStore.audioRef.play();
        playerStore.setPlaying(true);
      }
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
      playerStore.setPlaying(false);
    }
  };

  const playTrack = async (track) => {
    if (!playerStore.audioRef) {
      console.error("Плеер не инициализирован");
      return;
    }

    try {
      playerStore.setCurrentTrack(track);
      playerStore.audioRef.src = track.track_file;

      playerStore.setProgress(0);

      await playerStore.audioRef.play();
      playerStore.setPlaying(true);
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
      playerStore.setPlaying(false);
    }
  };

  const handleTrackEnd = async () => {
    if (playerStore.isRepeat) {
      try {
        playerStore.audioRef.currentTime = 0;
        playerStore.setProgress(0);
        await playerStore.audioRef.play();
        playerStore.setPlaying(true);
      } catch (error) {
        console.error("Ошибка повторного воспроизведения:", error);
        playerStore.setPlaying(false);
      }
    } else {
      const nextTrack = playerStore.playNextTrack();

      if (nextTrack) {
        await playTrack(nextTrack);
      } else {
        playerStore.setPlaying(false);
        playerStore.setProgress(0);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!playerStore.audioRef) return;
    const currentTime = playerStore.audioRef.currentTime;
    const duration = playerStore.audioRef.duration;
    if (duration) {
      const progress = (currentTime / duration) * 100;
      playerStore.setProgress(progress);
    }
  };

  const seekTo = (percentage) => {
    if (!playerStore.audioRef || !playerStore.currentTrack) return;
    const newTime = (percentage / 100) * playerStore.audioRef.duration;
    playerStore.audioRef.currentTime = newTime;
    playerStore.setProgress(percentage);
  };

  const updateVolume = () => {
    if (!playerStore.audioRef) return;
    playerStore.audioRef.volume = playerStore.volume / 100;
  };

  return {
    initPlayer,
    playTrack,
    togglePlayPause,
    handleTimeUpdate,
    handleTrackEnd,
    seekTo,
    updateVolume,
  };
}
