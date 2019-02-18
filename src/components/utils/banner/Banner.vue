<template>
  <div class="banner">
    <img v-if="image" :src="image">
    <img v-else src="@/assets/home/home-banner_tmp.png">
    <div class="search-bar-container">
      <h1>{{ title }}</h1>
      <search-bar type="normal" :placeholder="placeholder"></search-bar>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SearchBar } from '@/components/utils';

export default Vue.extend({
  name: 'Banner',
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  components: {
    SearchBar,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.banner {
  width: 100%;
  position: relative;
  height: 400px;
  background-color: black;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 30%;
    filter: brightness(70%);
  }
  .search-bar-container {
    position: absolute;
    top: 55px;
    width: 60%;
    min-width: 310px;
    right: 0;
    left: 0;
    margin: 0 auto;
    text-align: center;
    h1 {
      margin-bottom: 55px;
    }
    .search-bar {
      width: 100%;
    }
  }
}
</style>
