<template>
  <NuxtLayout name="default">
    <div class="centerblock__search search">
      <svg class="search__svg">
        <use xlink:href="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        class="search__text"
        type="search"
        placeholder="Поиск"
        name="search"
        v-model="searchQuery"
      />
    </div>

    <h2 class="centerblock__h2">Мои треки</h2>

    <FilterControls :tracks="tracks" />

    <div v-if="loading" class="content__playlist playlist">
      <div class="loading">Загрузка треков...</div>
    </div>

    <div v-else-if="error" class="content__playlist playlist">
      <div class="error">Ошибка загрузки треков: {{ error }}</div>
    </div>

    <Playlist v-else>
      <div class="content__playlist playlist">
        <MusicTrack v-for="track in tracks" :key="track._id" :track="track" />
      </div>
    </Playlist>
    <footer class="footer" />
  </NuxtLayout>
</template>

<script setup>
import { useFavoritesStore } from "~/stores/favorites";

const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

const loading = ref(false);
const searchQuery = ref("");
const error = ref(null);

const favoritesStore = useFavoritesStore();

const tracks = computed(() => favoritesStore.favoriteTracks);

const fetchFavoriteTracks = async () => {
  loading.value = true;
  error.value = null;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    error.value = "Пользователь не авторизован";
    loading.value = false;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      error.value = "Пожалуйста, войдите снова.";
      favoritesStore.setFavorites([]);
      loading.value = false;
      return;
    }

    const data = await response.json();

    if (data.success) {
      favoritesStore.setFavorites(data.data);
    } else {
      error.value = "Ошибка при загрузке избранных треков";
      favoritesStore.setFavorites([]);
    }
  } catch (e) {
    error.value = e.message || "Ошибка сети";
    favoritesStore.setFavorites([]);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFavoriteTracks();
});

useHead({
  title: "Мои треки | Skypro.Music",
  meta: [
    { name: "description", content: "Ваши любимые треки в одном месте" },
    { property: "og:title", content: "Мои треки | Skypro Music" },
    { property: "og:site_name", content: "Skypro Music" },
    { name: "twitter:title", content: "Skypro Music — Мои треки" },
  ],
});
</script>

<style scoped>
.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
}

.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}

.search__text {
  -webkit-box-flex: 100;
  -ms-flex-positive: 100;
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.search__text::-webkit-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text:-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
