import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentTrack: null,
    playlist: [],
    isPlaying: false,
    progress: 0,
    volume: 50,
    audioRef: null,
    isRepeat: false,
  }),

  actions: {
    getTrackId(track) {
      return track?.id ?? track?._id ?? null;
    },

    setCurrentTrack(track) {
      this.currentTrack = track;
    },

    setPlaylist(tracks) {
      this.playlist = tracks;
    },

    setProgress(progress) {
      this.progress = progress;
    },

    setVolume(volume) {
      this.volume = volume;
      if (this.audioRef) {
        this.audioRef.volume = volume / 100;
      }
    },

    setPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    setAudioRef(element) {
      this.audioRef = element;
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    toggleRepeat() {
      this.isRepeat = !this.isRepeat;
    },

    playNextTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      const currentId = this.getTrackId(this.currentTrack);
      const index = this.playlist.findIndex(
        (t) => String(this.getTrackId(t)) === String(currentId)
      );

      if (index === -1) return null;

      let nextIndex = index + 1;
      if (nextIndex >= this.playlist.length) {
        if (this.isRepeat) nextIndex = 0;
        else return null;
      }

      const nextTrack = this.playlist[nextIndex];
      this.setCurrentTrack(nextTrack);
      return nextTrack;
    },

    playPreviousTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      const currentId = this.getTrackId(this.currentTrack);
      const index = this.playlist.findIndex(
        (t) => String(this.getTrackId(t)) === String(currentId)
      );

      if (index === -1) return null;

      let prevIndex = index - 1;
      if (prevIndex < 0) {
        if (this.isRepeat) prevIndex = this.playlist.length - 1;
        else return null;
      }

      const prevTrack = this.playlist[prevIndex];
      this.setCurrentTrack(prevTrack);
      return prevTrack;
    },
  },
});
