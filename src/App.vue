<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>


<style lang="scss">
</style>
