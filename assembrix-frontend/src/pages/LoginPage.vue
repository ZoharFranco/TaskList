<template>
  <form @submit.prevent="login">
    <h1>Login</h1>
    <textarea v-model="username" placeholder="Username"/>
    <textarea v-model="password" type="password" placeholder="Password"/>
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
import {useAuthStore} from '@/store/authStore';
import {useRouter} from 'vue-router';
import {ref} from "vue";
import {User} from "@/models/user";

export default {
  setup() {
    const auth = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const login = async () => {
      let user: User = {
        username: username.value,
        password: password.value
      };
      await auth.login(user);
      await router.push('/dashboard');
    };

    return {username, password, login};
  },
};
</script>
