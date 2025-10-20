import { ref } from "vue";

export function useSelections() {
  const selections = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchSelections = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await $fetch(
        "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/all"
      );

      selections.value = data?.data || [];
      console.log('Загружено подборок:', selections.value.length);
      
    } catch (err) {
      console.error("Ошибка загрузки подборок:", err);
      error.value = "Не удалось загрузить подборки";
    } finally {
      loading.value = false;
    }
  };

  return {
    selections,
    loading,
    error,
    fetchSelections,
  };
}