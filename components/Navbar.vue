<template>
  <nav class="main__nav nav">

    <NuxtImg class="nav__logo logo"
      :placeholder="[4]"
      alt="логотип Skypro Music"  
      src="/img/logo (1).png" 
    />

    <div class="nav__burger burger" @click="toggleMenu">
      <span class="burger__line" />
      <span class="burger__line" />
      <span class="burger__line" />
    </div>

    <div class="nav__menu menu" :class="{ 'menu--open': isMenuOpen }">
      <ul class="menu__list">
        <li class="menu__item">
          <NuxtLink to="/" class="menu__link">Главное</NuxtLink>
        </li>
        <li class="menu__item">
          <NuxtLink to="/favorites" class="menu__link">Мой плейлист</NuxtLink>
        </li>
        <li class="menu__item">
          <NuxtLink to="/login" class="menu__link">Войти</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

onMounted(() => {
  isMenuOpen.value = false;
});
</script>

<style scoped>
.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.nav__menu {
  display: none;
}

.nav__menu.menu--open {
  display: block;
}

.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}

.menu__list {
  padding: 18px 0 10px 0;
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.logo__image {
  width: 113.33px;
  height: 17px;
  color: #181818;
}
</style>
