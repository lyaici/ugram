<template>
  <div class="users">
    <tab-bar selected="users"></tab-bar>
    <banner :image="bannerImage" title="Discover talented photographers"
    placeholder="Search any users"></banner>
    <wrapper :users="users"></wrapper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TabBar, Banner } from '@/components/utils';
import Wrapper from '@/components/users';
import { User } from '@/types';

export default Vue.extend({
  name: 'Users',
  computed: {
    bannerImage(): string {
      return this.$store.getters.getUsersBannerImage;
    },
    users(): User[] {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    handleScroll(e: Event) {
      const element: HTMLElement = document.documentElement as HTMLElement;
      const bottom: boolean = element.scrollTop + window.innerHeight === element.offsetHeight;
      if (bottom) this.$store.dispatch('loadNewUsersPage');
    },
  },
  components: {
    TabBar,
    Banner,
    Wrapper,
  },
  mounted() {
    if (this.bannerImage === '') this.$store.dispatch('loadUsersBannerImage');
    this.$store.dispatch('loadInitialUsers');
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  },
});
</script>

<style lang="scss" scoped>
.users {
  .banner {
    margin-bottom: 30px;
  }
  .wrapper {
    margin-bottom: 20px;
  }
}
</style>
