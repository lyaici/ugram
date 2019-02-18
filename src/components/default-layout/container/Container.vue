<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Container',
});
</script>


<style lang="scss" scoped>

</style>
