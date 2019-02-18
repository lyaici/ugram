<template>
  <div class="wrapper">
    <card  v-for="user in users" :key="user.id" :user="user"></card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '../card';

export default Vue.extend({
  name: 'Wrapper',
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  components: {
    Card,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.wrapper {
  display: grid;
  @media screen and (min-width: $tablet){
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: $tablet){
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: $mobile){
    grid-template-columns: repeat(1, 1fr);
  }
  grid-column-gap: 40px;
  grid-row-gap: 90px;
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;
  .card {
    animation: slide-up 0.5s ease;
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
