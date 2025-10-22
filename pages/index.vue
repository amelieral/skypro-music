<template>
  <NuxtLayout name="default">
    <div class="centerblock__search search">
      <svg class="search__svg">
        <use xlink:href="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        v-model="searchQuery"
        class="search__text"
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
    <h2 class="centerblock__h2">Треки</h2>

    <FilterControls />

    <div v-if="pending" class="content__playlist playlist">
      <div class="loading">Загрузка треков...</div>
    </div>

    <div v-else-if="error" class="content__playlist playlist">
      <div class="error">Ошибка загрузки треков: {{ error }}</div>
    </div>

    <Playlist v-else>
      <div class="content__playlist playlist">
        <MusicTrack
          v-for="track in tracksStore.displayedTracks"
          :key="track.id"
          :track="track"
        />
      </div>
    </Playlist>
    <footer class="footer" />
  </NuxtLayout>
</template>

<script setup>
const {
  data: response,
  pending,
  error,
} = await useFetch(
  "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/"
);

const tracks = computed(() => response.value?.data || []);

const tracksStore = useTracks();
const playerStore = usePlayerStore();

watch(
  tracks,
  (newTracks) => {
    if (newTracks.length > 0) {
      tracksStore.setTracks(newTracks);
      playerStore.setPlaylist(newTracks);
    }
  },
  { immediate: true }
);

const searchQuery = computed({
  get: () => tracksStore.searchQuery,
  set: (value) => tracksStore.setSearchQuery(value),
});

useHead({
  title: "Треки | Skypro.Music",
  meta: [
    { name: "description", content: "Все треки в одном месте" },
    { property: "og:title", content: "Треки | Skypro Music" },
    { property: "og:site_name", content: "Skypro Music" },
    { name: "twitter:title", content: "Skypro Music — Треки" },
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
