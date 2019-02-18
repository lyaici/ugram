<template>
  <div :class="['search-bar', type]">
    <font-awesome-icon class="fa" icon="search" :style="{ color: '#696969' }"/>
    <input type="text" :placeholder="placeholder">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SearchBar',
  props: {
    type: {
      type: String,
      required: true,
      validator: (style: string) => ['small', 'normal'].indexOf(style) > -1,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  &.small {
    input {
      box-sizing: border-box;
      width: 100%;
      min-width: 150px;
      height: 40px;
      border-radius: 50px;
      background-color: #ececec;
      border: none;
      text-indent: 40px;
      outline: none;
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
      color: #696969;
    }
  }
  &.normal {
    input {
      box-sizing: border-box;
      width: 100%;
      min-width: 150px;
      height: 50px;
      border-radius: 10px;
      background-color: white;
      border: none;
      text-indent: 40px;
      outline: none;
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
      font-weight: bold;
      color: #696969;
    }
  }
  .fa {
    position: absolute;
    margin-left: 15px;
  }
}
</style>
