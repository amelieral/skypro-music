import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteTracks = ref([]);
  const loading = ref(false);

  const isTrackLiked = (trackId) => {
    return favoriteTracks.value.some(
      (track) => track._id === trackId || track.id === trackId
    );
  };

  const setFavorites = (tracks) => {
    favoriteTracks.value = tracks;
  };

  const addToFavorites = (track) => {
    if (!isTrackLiked(track._id || track.id)) {
      favoriteTracks.value.push(track);
    }
  };

  const removeFromFavorites = (trackId) => {
    favoriteTracks.value = favoriteTracks.value.filter(
      (track) => track._id !== trackId && track.id !== trackId
    );
  };

  const toggleFavorite = (track, isLiked) => {
    const trackId = track._id || track.id;
    if (isLiked) {
      addToFavorites(track);
    } else {
      removeFromFavorites(trackId);
    }
  };

  return {
    favoriteTracks,
    loading,
    isTrackLiked,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
  };
});
