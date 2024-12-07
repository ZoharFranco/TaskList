<!-- pages/RegisterPage.vue -->
<template>

  <h1>Register</h1>
  <form @submit.prevent="register">
    <textarea v-model="username" placeholder="Username" required/>
    <textarea v-model="password" type="password" placeholder="Password" required/>
    <textarea v-model="confirmPassword" type="password" placeholder="Confirm Password" required/>
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">

import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/authStore.js";
import {ref} from "vue";
import {User} from "@/models/user.js";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
      }
      let user: User = {
        username: username.value,
        password: password.value
      };
      await authStore.register(user);
      await router.push('/login');
    };

    return {username, password, confirmPassword, register};
  },
};
</script>

