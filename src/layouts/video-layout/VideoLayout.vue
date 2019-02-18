<template>
  <div class="video-layout">
    <div class="background-video">
      <video autoplay muted loop preload="true">
        <source src="@/assets/video/background-video.webm" type="video/mp4">
      </video>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VideoLayout',
});
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.video-layout {
  box-sizing: border-box;
  .background-video {
    video {
      position: absolute;
      right: 0;
      bottom: 0;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      z-index: -100;
    }
  }
}
</style>
