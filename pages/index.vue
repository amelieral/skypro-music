<template>
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <Navbar />

        <div class="main__centerblock centerblock">
          <div class="centerblock__search search">
            <svg class="search__svg">
              <use xlink:href="/img/icon/sprite.svg#icon-search" />
            </svg>
            <input
              class="search__text"
              type="search"
              placeholder="Поиск"
              name="search"
            >
          </div>
          <h2 class="centerblock__h2">Треки</h2>

          <FilterControls :tracks="tracks" />

          <div v-if="pending" class="content__playlist playlist">
            <div class="loading">Загрузка треков...</div>
          </div>

          <div v-else-if="error" class="content__playlist playlist">
            <div class="error">Ошибка загрузки треков: {{ error }}</div>
          </div>

          <Playlist v-else>
            <div class="content__playlist playlist">
              <MusicTrack v-for="track in tracks" :key="track.id" :track="track" />
            </div>
          </Playlist>
        </div>

        <div class="main__sidebar sidebar">
          <div class="sidebar__personal">
            <p class="sidebar__personal-name">Sergey.Ivanov</p>
            <div class="sidebar__icon">
              <svg>
                <use xlink:href="/img/icon/sprite.svg#logout" />
              </svg>
            </div>
          </div>
          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    src="/img/playlist01.png"
                    alt="day's playlist"
                  >
                </a>
              </div>
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    src="/img/playlist02.png"
                    alt="day's playlist"
                  >
                </a>
              </div>
              <div class="sidebar__item">
                <a class="sidebar__link" href="#">
                  <img
                    class="sidebar__img"
                    src="/img/playlist03.png"
                    alt="day's playlist"
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PlayerBar />
      <footer class="footer" />
    </div>
  </div>
</template>

<script setup>
const { data: response, pending, error } = await useFetch(
  'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/'
)

const tracks = computed(() => response.value?.data || [])
</script>

<style scoped>
.main {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.main__nav {
  width: 244px;
  background-color: #181818;
  padding: 20px 0 20px 36px;
}

.main__centerblock {
  width: auto;
  -webkit-box-flex: 3;
  -ms-flex-positive: 3;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
}

.main__sidebar {
  max-width: 418px;
  padding: 20px 90px 20px 78px;
}

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

.centerblock__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
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

.sidebar__personal {
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
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
}

.sidebar__personal-name {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__block {
  height: 100%;
  padding: 240px 0 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.sidebar__list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.sidebar__item {
  width: 250px;
  height: 150px;
}

.sidebar__item:not(:last-child) {
  margin-bottom: 30px;
}

.sidebar__link {
  width: 100%;
  height: 100%;
}

.sidebar__img {
  width: 100%;
  height: auto;
}
</style>
