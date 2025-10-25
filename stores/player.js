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
    isShuffle: false,
    shuffledPlaylist: [],
  }),

  getters: {
    currentPlaylist: (state) =>
      state.isShuffle ? state.shuffledPlaylist : state.playlist,

    hasTracks: (state) => state.playlist.length > 0,
  },

  actions: {
    getTrackId(track) {
      return track?.id ?? track?._id ?? null;
    },

    setCurrentTrack(track) {
      this.currentTrack = track;
    },

    setPlaylist(tracks) {
      if (!Array.isArray(tracks)) {
        tracks = tracks ? [tracks] : [];
      }

      this.playlist = tracks;

      if (this.isShuffle) {
        this.shuffledPlaylist = this.shuffleArray(tracks);
      }
    },

    setProgress(progress) {
      this.progress = Math.max(0, Math.min(100, progress)); 
    },

    setVolume(volume) {
      this.volume = Math.max(0, Math.min(100, volume)); 
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    setPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    setAudioRef(element) {
      this.audioRef = element;
      if (this.audioRef && this.volume !== undefined) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    toggleRepeat() {
      this.isRepeat = !this.isRepeat;
    },

    toggleShuffle() {
      this.isShuffle = !this.isShuffle;

      if (this.isShuffle) {
        this.shuffledPlaylist = this.shuffleArray(this.playlist);
      } else {
        this.shuffledPlaylist = [];
      }
    },

    shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    },

    playNextTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      const list = this.isShuffle ? this.shuffledPlaylist : this.playlist;
      const currentId = this.getTrackId(this.currentTrack);
      const currentIndex = list.findIndex(
        (t) => String(this.getTrackId(t)) === String(currentId)
      );

      if (currentIndex === -1) return null;

      const nextIndex = this.getNextTrackIndex(currentIndex, list.length);
      if (nextIndex === -1) return null;

      const nextTrack = list[nextIndex];
      this.setCurrentTrack(nextTrack);
      return nextTrack;
    },

    playPreviousTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      const list = this.isShuffle ? this.shuffledPlaylist : this.playlist;
      const currentId = this.getTrackId(this.currentTrack);
      const currentIndex = list.findIndex(
        (t) => String(this.getTrackId(t)) === String(currentId)
      );

      if (currentIndex === -1) return null;

      const prevIndex = this.getPreviousTrackIndex(currentIndex, list.length);
      if (prevIndex === -1) return null;

      const prevTrack = list[prevIndex];
      this.setCurrentTrack(prevTrack);
      return prevTrack;
    },

    getNextTrackIndex(currentIndex, playlistLength) {
      let nextIndex = currentIndex + 1;

      if (nextIndex >= playlistLength) {
        return this.isRepeat ? 0 : -1;
      }

      return nextIndex;
    },

    getPreviousTrackIndex(currentIndex, playlistLength) {
      let prevIndex = currentIndex - 1;

      if (prevIndex < 0) {
        return this.isRepeat ? playlistLength - 1 : -1;
      }

      return prevIndex;
    },
  },
});
