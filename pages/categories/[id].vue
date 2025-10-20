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
      />
    </div>
    <h2 class="centerblock__h2">{{ categoryName }}</h2>

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
import MusicTrack from "~/components/MusicTrack.vue";
import { useRoute } from "vue-router";
import { useCategoryTracks } from "~/composables/useCategoryTracks";
import { watch } from "vue";

const route = useRoute();
const { tracks, categoryName, loading, error, fetchCategoryData } =
  useCategoryTracks();

watch(categoryName, (newName) => {
  useHead({
    title: `${newName || ""} | Skypro.Music`,
  });
});

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchCategoryData(newId);
    }
  },
  { immediate: true }
);
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
