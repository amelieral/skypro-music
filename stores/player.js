import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentTrack: null,

    playlist: [],

    isPlaying: false,

    progress: 0,

    volume: 50,

    audioRef: null,

    isShuffle: false,

    isRepeat: false,

    shuffledPlaylist: [],

    shuffleIndex: 0,
  }),

  actions: {
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

    generateShuffledPlaylist() {
      this.shuffledPlaylist = [...this.playlist];
      for (let i = this.shuffledPlaylist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledPlaylist[i], this.shuffledPlaylist[j]] = [
          this.shuffledPlaylist[j],
          this.shuffledPlaylist[i],
        ];
      }
      this.shuffleIndex = 0;
    },

    toggleShuffle() {
      this.isShuffle = !this.isShuffle;

      if (this.isShuffle) {
        this.generateShuffledPlaylist();

        if (!this.currentTrack && this.shuffledPlaylist.length > 0) {
          this.setCurrentTrack(this.shuffledPlaylist[0]);
        } else {
          const idx = this.shuffledPlaylist.findIndex(
            (t) => t.id === this.currentTrack?.id
          );
          this.shuffleIndex = idx >= 0 ? idx : 0;
        }
      }
    },

    toggleRepeat() {
      this.isRepeat = !this.isRepeat;
    },

    playNextTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      if (this.isShuffle) {
        this.shuffleIndex++;

        if (this.shuffleIndex >= this.shuffledPlaylist.length) {
          if (this.isRepeat) {
            this.generateShuffledPlaylist();
            this.shuffleIndex = 0;
          } else {
            return null;
          }
        }

        const nextTrack = this.shuffledPlaylist[this.shuffleIndex];
        this.setCurrentTrack(nextTrack);
        return nextTrack;
      } else {
        const index = this.playlist.findIndex(
          (track) => track.id === this.currentTrack.id
        );

        let nextIndex = index + 1;

        if (nextIndex >= this.playlist.length) {
          if (this.isRepeat) {
            nextIndex = 0;
          } else {
            return null;
          }
        }

        const nextTrack = this.playlist[nextIndex];
        this.setCurrentTrack(nextTrack);
        return nextTrack;
      }
    },

    playPreviousTrack() {
      if (!this.currentTrack || !this.playlist.length) return null;

      if (this.isShuffle) {
        this.shuffleIndex--;

        if (this.shuffleIndex < 0) {
          if (this.isRepeat) {
            this.generateShuffledPlaylist();
            this.shuffleIndex = this.shuffledPlaylist.length - 1;
          } else {
            return null;
          }
        }

        const prevTrack = this.shuffledPlaylist[this.shuffleIndex];
        this.setCurrentTrack(prevTrack);
        return prevTrack;
      } else {
        const index = this.playlist.findIndex(
          (track) => track.id === this.currentTrack.id
        );

        let prevIndex = index - 1;

        if (prevIndex < 0) {
          if (this.isRepeat) {
            prevIndex = this.playlist.length - 1;
          } else {
            return null;
          }
        }

        const prevTrack = this.playlist[prevIndex];
        this.setCurrentTrack(prevTrack);
        return prevTrack;
      }
    },
  },
});
