<template>
  <div :class="['tab-bar', selected]">
    <router-link id="images" class="dark" :to="{ name: 'Home' }">Images</router-link>
    <router-link id="users" class="dark" :to="{ name: 'Users' }">Users</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TabBar',
  props: {
    selected: {
      type: String,
      required: true,
      validator: (style: string) => ['images', 'users'].indexOf(style) > -1,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';
@import '@/styles/color.scss';

.tab-bar {
  display: flex;
  flex-direction: row;
  padding-top: 50px;
  @media screen and (min-width: $tablet){
    padding-left: 200px;
  }
  @media screen and (max-width: $tablet){
    padding-left: 100px;
  }
  &.images {
    #images {
      padding-bottom: 10px;
      border-bottom: 2px $main-color solid;
    }
  }
  &.users {
    #users {
      padding-bottom: 10px;
      border-bottom: 2px $main-color solid;
    }
  }
  a {
    margin-right: 30px;
  }
}
</style>
