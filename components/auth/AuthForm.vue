<template>
  <div class="wrapper">
    <div class="container-auth">
      <div class="modal__block">
        <form class="modal__form-login" @submit.prevent="handleSubmit">
          <NuxtLink to="/">
              <NuxtImg class="modal__logo"
              :placeholder="[5]" 
              src="/img/logo_modal.png"
              alt="logo login" 
              />
            </NuxtLink>

          <input
            v-model="email"
            class="modal__input login"
            type="text"
            name="login"
            placeholder="Почта"
          />

          <input
            v-model="password"
            class="modal__input password-first"
            type="password"
            name="password"
            placeholder="Пароль"
          />

          <input
            v-if="isRegistration"
            v-model="username"
            class="modal__input"
            type="text"
            placeholder="Имя пользователя"
            required
          />

          <button type="submit" class="modal__btn">
            {{ isRegistration ? "Зарегистрироваться" : "Войти" }}
          </button>

          <NuxtLink
            v-if="!isRegistration"
            to="/signup"
            class="modal__btn-switch"
          >
            Зарегистрироваться
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showError, navigateTo } from 'nuxt/app';
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()

const props = defineProps({
  isRegistration: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const email = ref("");
const password = ref("");
const username = ref(""); 

const handleSubmit = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    throw showError({
      statusCode: 400,
      message: "Заполните email и пароль",
    });
  }

  if (props.isRegistration && !username.value.trim()) {
    throw showError({
      statusCode: 400,
      message: "Заполните имя пользователя",
    });
  }
  
  const API_BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

  try {
    if (props.isRegistration) {
      const response = await fetch(`${API_BASE_URL}/user/signup/`, {
        method: "POST",
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value.trim(),
          username: username.value.trim(),
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Ответ сервера при регистрации:", data);

      if (response.status === 201) {
        alert("Пользователь успешно создан!");
        await navigateTo("/login");
      } else if (response.status === 403) {
        alert(data.message || "Email уже занят");
      } else {
        alert(data.message || "Ошибка регистрации");
      }
    } else {
      const loginResponse = await fetch(`${API_BASE_URL}/user/login/`, {
        method: "POST",
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value.trim(),
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const loginData = await loginResponse.json();
      console.log("Данные пользователя при входе:", loginData);

      if (loginResponse.status === 200) {
        const tokenResponse = await fetch(`${API_BASE_URL}/user/token/`, {
          method: "POST",
          body: JSON.stringify({
            email: email.value.trim(),
            password: password.value.trim(),
          }),
          headers: {
            "content-type": "application/json",
          },
        });

        const tokenData = await tokenResponse.json();

        if (tokenResponse.status === 200) {
          localStorage.setItem("accessToken", tokenData.access);
          localStorage.setItem("refreshToken", tokenData.refresh);
          userStore.setUser(loginData);
          await navigateTo("/");
        } else {
          alert("Ошибка получения токена");
        }
      } else if (loginResponse.status === 401) {
        alert(loginData.message || "Неверный email или пароль");
      } else {
        alert(loginData.message || "Ошибка входа");
      }
    }
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Произошла ошибка");
  }
};
</script>

<style>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.container-auth {
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgb(24, 24, 24);
}

.modal__block {
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
}

.modal__form-login {
  width: 366px;
  height: 439px;
  background-color: #ffffff;
  border-radius: 12px;
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
  padding: 43px 44px 47px 40px;
}

.modal__form-login input:first-child {
  margin-bottom: 30px;
}

.modal__logo {
  width: 140px;
  height: 21px;
  margin-bottom: 34px;
  background-color: transparent;
}

.modal__logo img {
  width: 140px;
  height: auto;
}

.modal__input {
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;
  margin-right: 3px;
  margin-bottom: 30px;
}

.modal__input::-webkit-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input:-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
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

.modal__btn:hover {
}

.modal__btn:active {
  background-color: #271a58; 
}

.modal__btn-switch {
  width: 278px;
  height: 62px;
  background-color: #ffffff; 
  border: 1px solid #d0cece; 
  border-radius: 6px;
  margin-top: 20px;
  color: #000000; 
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none; 
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.modal__btn-switch:hover {
  background-color: #f4f5f6; 
  border-color: #bfbfbf; 
}

.modal__btn-switch:active {
  background-color: #d9d9d9; 
  border-color: #a6a6a6; 
}
</style>
