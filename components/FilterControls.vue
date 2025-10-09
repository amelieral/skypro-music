<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'author' }"
        @click="toggleFilter('author')"
      >
        исполнителю
      </div>
      <div v-show="activeFilter === 'author'" class="filter__dropdown">
        <ul class="filter__list">
          <li v-for="item in authorItems" :key="item" class="filter__item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'year' }"
        @click="toggleFilter('year')"
      >
        году выпуска
      </div>
      <div v-show="activeFilter === 'year'" class="filter__dropdown">
        <ul class="filter__list">
          <li v-for="item in yearItems" :key="item" class="filter__item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'genre' }"
        @click="toggleFilter('genre')"
      >
        жанру
      </div>
      <div v-show="activeFilter === 'genre'" class="filter__dropdown filter__dropdown--genre">
        <ul class="filter__list">
          <li v-for="item in genreItems" :key="item" class="filter__item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeFilter = ref(null);

const props = defineProps({
  tracks: {
    type: Array,
    default: () => [],
  },
});

const authorItems = computed(() => {
  if (!props.tracks) return [];
  const items = new Set();
  props.tracks.forEach((track) => {
    if (track.author) {
      items.add(track.author);
    }
  });
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1;
    if (b === "Неизвестно") return -1;
    return a.localeCompare(b);
  });
});

const yearItems = computed(() => {
  if (!props.tracks) return [];
  const items = new Set();
  props.tracks.forEach((track) => {
    let year = "Неизвестно";
    
    if (track.release_date) {
      const date = new Date(track.release_date.split("<")[0]);
      if (!isNaN(date.getTime())) {
        year = date.getFullYear().toString();
      }
    }
    items.add(year);
  });
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1;
    if (b === "Неизвестно") return -1;
    return b.localeCompare(a); 
  });
});

const genreItems = computed(() => {
  if (!props.tracks) return [];
  const items = new Set();
  props.tracks.forEach((track) => {
    if (Array.isArray(track.genre)) {
      track.genre.forEach((g) => g && items.add(g.toLowerCase().trim()));
    } else if (track.genre) {
      items.add(track.genre.toLowerCase().trim());
    }
  });
  return Array.from(items).sort((a, b) => {
    if (a === "неизвестно") return 1;
    if (b === "неизвестно") return -1;
    return a.localeCompare(b);
  });
});

const toggleFilter = (filter) => {
  activeFilter.value = activeFilter.value === filter ? null : filter;
};
</script>

<style scoped>
.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
}

.filter__button:not(:last-child) {
  margin-right: 10px;
}

.centerblock__filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 51px;
}

._btn-text {
  border: 1px solid #ffffff;
  color: #ffffff;
  transition: color 0.3s, border-color 0.3s;
}

._btn-text:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
  cursor: pointer;
}

._btn-text.active {
  border-color: #ad61ff;
  color: #ad61ff;
}

._btn-text.active:hover {
  border-color: #c27eff;
  color: #c27eff;
}

.filter__wrapper {
  position: relative;
}

.filter__dropdown {
  overflow-y: auto;
  position: absolute;
  top: calc(100% + 8px);
  width: 248px;
  height: 305px;
  background: #313131;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 34px; 
}

.filter__dropdown--genre {
  height: 196px; 
}


.filter__list {
  margin: 0;
  padding: 0;
  list-style: none;

}

.filter__item:last-child {
  margin-bottom: 0; 
}

.filter__item {
  padding: 6px 0;
  color: white;
  cursor: pointer;
  font-family: 'StratosSkyeng', sans-serif;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 20px;
}

.filter__item:hover {
  color: #b672ff;
  text-decoration: underline;
}

.filter__dropdown::-webkit-scrollbar {
  width: 4px;
  height: 237px;
}

.filter__dropdown::-webkit-scrollbar-track {
  background-color: #4b4949;
  border-radius: 10px;
  margin: 34px 0; 
}

.filter__dropdown::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border-radius: 10px;
  min-height: 65px;
}

.filter__dropdown::after {
  display: none;
}
</style>