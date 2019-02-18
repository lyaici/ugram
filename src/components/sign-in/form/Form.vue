<template>
  <div class="form">
    <div class="main-logo">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/navbar/main-logo.png">
      </router-link>
    </div>
    <div class="login">
      <Input name="email" label="Email address" type="email"
      placeholder="Enter your email address"/>
      <Input name="password" label="Password" type="password" placeholder="Enter your password"/>
      <Button @click.native="login()">Login</Button>
      <h2>OR</h2>
      <Button type="facebook">
        <img src="@/assets/utils/facebook-icon.png" width="20px" height="20px">
        Login with facebook
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, Input } from '@/components/utils';

export default Vue.extend({
  name: 'Form',
  methods: {
    login() {
      this.$store.commit('login');
      this.$router.push({ name: 'Home' });
    },
  },
  components: {
    Button,
    Input,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

.form {
  display: flex;
  flex-direction: column;
  background-color: white;
  background-clip: padding-box;
  box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  .main-logo {
    @media screen and (min-width: $mobile) {
      margin-top: 50px;
      margin-bottom: 50px;
      border-radius: 5px;
      img {
        max-width: 300px;
      }
    }
    @media screen and (max-width: $mobile) {
      margin-top: 30px;
      margin-bottom: 30px;
      img {
        max-width: 200px;
      }
    }
  }
  .main-logo-small {
    display: none;
  }
  .login {
    display: flex;
    flex-direction: column;
    width: 90%;
    .button {
      padding: 15px 0;
      margin-bottom: 20px;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
</style>
