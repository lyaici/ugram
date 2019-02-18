<template>
  <div class="navbar">
    <div class="main-logo">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/navbar/main-logo.png">
      </router-link>
    </div>
    <div class="main-logo-small">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/navbar/main-logo-small.png">
      </router-link>
    </div>
    <search-bar type="small"></search-bar>
    <div class="connected" v-if="user.id">
      <div class="user">
        <img id="user-logo" src="@/assets/navbar/user-logo_tmp.jpeg">
        <router-link class="light" :to="{ name: 'Profile', params: { id: user.id } }">
          {{ user.firstName }} {{ user.lastName }}
        </router-link>
      </div>
      <div class="settings">
        <Button type="submit" @click.native="$emit('openModal')">Submit a photo</Button>
        <a class="dark" @click="logout()">Logout</a>
      </div>
    </div>
    <div class="disconnected" v-else>
      <router-link class="white" :to="{ name: 'SignIn' }">
        <Button>
          Sign In
        </Button>
      </router-link>
      <router-link class="white" :to="{ name: 'SignUp' }">
        <Button type="secondary">
          Sign Up
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SearchBar, Button } from '@/components/utils';
import { User } from '@/types';

export default Vue.extend({
  name: 'Navbar',
  computed: {
    user(): User {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    },
  },
  components: {
    SearchBar,
    Button,
  },
});
</script>


<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  &.scrolled {
    box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.350);
  }
  @media screen and (min-width: $tablet){
    .main-logo {
      display: inline;
      margin-left: 20px;
      img {
        $img-size: 120px;
        max-width: $img-size;
      }
    }
    .main-logo-small {
      display: none;
    }
    .connected {
      margin-right: 80px;
      .user {
        margin-right: 30px;
      }
    }
    .disconnected {
      margin-right: 80px;
    }
  }
  @media screen and (max-width: $tablet){
    .main-logo-small {
      display: inline;
      margin-left: 20px;
      img {
        $img-size: 45px;
        max-width: $img-size;
      }
    }
    .main-logo {
      display: none;
    }
    .connected {
      margin-right: 20px;
      .user {
        margin-right: 20px;
      }
    }
    .disconnected {
      margin-right: 20px;
    }
  }
  @media screen and (min-width: $mobile) {
    .connected {
      .user {
        #user-logo {
          margin-right: 20px;
        }
      }
    }
    .disconnected {
      .button {
        margin-right: 15px;
      }
    }
  }
  @media screen and (max-width: $mobile) {
    .connected {
      .user {
        #user-logo {
          margin-right: 5px;
        }
      }
      .settings {
        .button {
          display: none;
        }
      }
    }
    .disconnected {
      .button {
        min-width: 50px;
        padding: 10px 20px;
        margin-right: 5px;
      }
    }
    .search-bar {
      display: none;
    }
  }
  .search-bar {
    margin: 0 20px;
    width: 1200px;
  }
  .connected {
    display: flex;
    flex-direction: row;
    align-items: center;
    .user {
      display: flex;
      align-items: center;
      #user-logo {
        max-width: 40px;
        border-radius: 180px;
      }
    }
    .settings {
      display: flex;
      flex-direction: row;
      align-items: center;
      a {
        margin-right: 20px;
      }
    }
  }
  .disconnected {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
