import { ref } from "vue";

const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useCategoryTracks = () => {
  const tracks = ref([]);
  const categoryName = ref("");
  const loading = ref(false);
  const error = ref(null);

  const fetchTracksByIds = async (ids) => {
    try {
      const response = await fetch(`${API_URL}/catalog/track/all/`);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        tracks.value = result.data.filter((track) => ids.includes(track._id));
      } else {
        error.value = "Не удалось получить треки";
        tracks.value = [];
      }
    } catch (e) {
      error.value = e.message || "Ошибка загрузки треков";
      tracks.value = [];
    }
  };

  const fetchCategoryData = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_URL}/catalog/selection/${id}/`);
      const result = await response.json();
      console.log("SELECTION DATA:", result);
      console.log("SELECTION ITEMS:", result.data.items);

      if (result.success && result.data) {
        categoryName.value = result.data.name || "Без названия";
        const trackIds = result.data.items || []; 
        await fetchTracksByIds(trackIds);
      } else {
        error.value = "Категория не найдена";
        tracks.value = [];
        categoryName.value = "";
      }
    } catch (e) {
      error.value = e.message || "Неизвестная ошибка";
      tracks.value = [];
      categoryName.value = "";
    } finally {
      loading.value = false;
    }
  };

  return { tracks, categoryName, loading, error, fetchCategoryData };
};
