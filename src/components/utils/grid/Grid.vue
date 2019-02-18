<template>
  <div class="grid">
    <div v-for="(image, index) in images" :key="index" class="item">
      <img @click="$emit('image', image)" :src="image.url">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Grid',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.grid {
  display: grid;
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  @media screen and (min-width: $tablet){
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: $tablet){
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: $mobile){
    grid-template-columns: repeat(1, 1fr);
  }
  grid-gap: 20px;
  .item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: 0.5s;
      animation: slide-up 0.5s ease;
      &:hover {
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  @keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }
}
</style>
