<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'author' || selectedAuthor }"
        @click="toggleFilter('author')"
      >
        исполнителю
        <span v-if="selectedAuthor" class="filter-indicator"></span>
      </div>
      <div v-show="activeFilter === 'author'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in authorItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedAuthor === item }"
            @click="selectAuthor(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{ active: activeFilter === 'year' || selectedYear.length > 0 }"
        @click="toggleFilter('year')"
      >
        году выпуска
        <span v-if="selectedYear.length" class="filter-indicator">
          {{ selectedYear.length }}
        </span>
      </div>
      <div v-show="activeFilter === 'year'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in yearItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedYear === item }"
            @click="selectYear(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="filter__wrapper">
      <div
        class="filter__button button-author _btn-text"
        :class="{
          active: activeFilter === 'genre' || selectedGenre.length > 0,
        }"
        @click="toggleFilter('genre')"
      >
        жанру
        <span v-if="selectedGenre.length" class="filter-indicator">
          {{ selectedGenre.length }}
        </span>
      </div>
      <div
        v-show="activeFilter === 'genre'"
        class="filter__dropdown filter__dropdown--genre"
      >
        <ul class="filter__list">
          <li
            v-for="item in genreItems"
            :key="item"
            class="filter__item"
            :class="{ active: selectedGenre === item }"
            @click="selectGenre(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

const tracksStore = useTracks();


const {
  activeFilter,
  selectedAuthor,
  selectedYear,
  selectedGenre,
  authorItems,
  yearItems,
  genreItems,
} = storeToRefs(tracksStore);


const {
  setActiveFilter,
  setSelectedAuthor,
  setSelectedYear,
  setSelectedGenre,
} = tracksStore;

const toggleFilter = (filter) => {
  setActiveFilter(filter);
};

const selectAuthor = (author) => {
  setSelectedAuthor(author);
};

const selectYear = (year) => {
  setSelectedYear(year);
};

const selectGenre = (genre) => {
  setSelectedGenre(genre);
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
  position: relative;
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
  font-family: "StratosSkyeng", sans-serif;
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

.filter-indicator {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background-color: #ad61ff;
  border-radius: 50%;
}

.filter__item.active {
  color: #ad61ff;
  text-decoration: underline;
}
</style>
