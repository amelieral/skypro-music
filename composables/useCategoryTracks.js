import { ref } from "vue";

const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useCategoryTracks = () => {
  const tracks = ref([]);
  const categoryName = ref("");
  const loading = ref(false);
  const error = ref(null);

  const fetchTracksByIds = async (ids) => {
    try {
      const trackPromises = ids.map((id) =>
        fetch(`${API_URL}/catalog/track/${id}`).then((res) => res.json())
      );
      const tracksResults = await Promise.all(trackPromises);

      tracks.value = tracksResults
        .filter((res) => res.success && res.data)
        .map((res) => res.data);
    } catch (e) {
      error.value = e.message || "Ошибка загрузки треков";
      tracks.value = [];
    }
  };

  const fetchCategoryData = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_URL}/catalog/selection/${id}`);
      const result = await response.json();

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
