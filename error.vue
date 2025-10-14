<template>
  <div class="error-page">
    <h1>Ошибка {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink :to="redirectPath" class="modal__btn">Вернуться</NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue";

defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const isAuthorized = !!localStorage.getItem("accessToken");

const redirectPath = computed(() => (isAuthorized ? "/" : "/signup"));
</script>

<style scoped>
.wrapper {
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
}
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #181818;
  gap: 30px;
  padding-top: 0;
  min-height: 100vh;
}
h1 {
  font-size: 50px;
}
p {
  font-size: 30px;
}
.btn {
  margin-top: 2rem;
  background-color: #5c2e91; /* фиолетовый */
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn:hover {
  background-color: #7e49b8;
}

.modal__btn {
  width: 278px;
  height: 62px;
  background-color: #580ea2;
  border-radius: 6px;
  border: none;
  margin-top: 30px;
  color: #ffffff;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}
</style>
