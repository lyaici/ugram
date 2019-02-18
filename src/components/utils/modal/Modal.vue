<template>
  <div class="modal">
    <div @click="$emit('closeModal')" class="dark-background"/>
    <div :class="['slot', size]">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HandleModal from '@/mixins';

export default Vue.extend({
  name: 'Modal',
  props: {
    size: {
      type: String,
      required: false,
      default: 'small',
      validator: (size: string) => ['small', 'large'].indexOf(size) > -1,
    },
  },
  created() {
    HandleModal.methods.switchScroll();
  },
  beforeDestroy() {
    HandleModal.methods.switchScroll();
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: auto;
  .dark-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.555);
    transition: opacity .3s ease;
    overflow: auto;
  }
  .slot {
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    left: 0;
    @media screen and (min-width: $mobile) {
      padding: 0 15px;
      min-width: 290px;
      &.large {
        max-width: 90%;
        margin: 30px auto;
      }
      &.small {
        max-width: 750px;
        margin: 100px auto;
      }
    }
    @media screen and (max-width: $mobile) {
      &.large {
        margin-bottom: 50px;
      }
      &.small {
        max-width: 750px;
        margin-bottom: 30px;
      }
    }
    animation: slide-up 0.5s ease;
  }
  @keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
  }
}
</style>
