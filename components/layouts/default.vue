<template>
  <div class="wrapper">
    <div class="container">
      <div class="main">
        <MainNav />
          <div class="main__centerblock">
            <slot></slot>
          </div>
        <MainSidebar />
        </div>
      <PlayerBar />
    </div>
  </div>
</template>

<script setup>

useHead({
  title: "Избранное | Skypro.Music",
  meta: [
    { name: "description", content: "Ваши любимые треки в одном месте" },
    { property: "og:title", content: "Избранное | Skypro Music" },
    { property: "og:site_name", content: "Skypro Music" },
    { name: "twitter:title", content: "Skypro Music — Избранное" },
  ],
});
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
</style>