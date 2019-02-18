<template>
  <a :class="['button', type]">
    <slot/>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: (style: string) => ['primary', 'secondary', 'edit', 'delete', 'facebook', 'submit', 'submit-mobile'].indexOf(style) > -1,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/typography.scss';

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px;
  min-width: 100px;
  background-size: 200% auto;
  transition: 0.7s;
  &.primary {
    background-image: $fency-color;
    color: white;
    border: none;
    &:hover {
      background-position: right center;
    }
  }
  &.secondary {
    background-image: $fency-color-secondary;
    color: white;
    border: none;
    &:hover {
      background-position: right center;
    }
  }
  &.edit {
    color: $main-color;
    border: 1px solid $main-color;
    &:hover {
      background-color: $main-color;
      color: white;
    }
  }
  &.delete {
    color: $error-color;
    border: 1px solid $error-color;
    &:hover {
      background-color: $error-color;
      color: white;
    }
  }
  &.facebook {
    background-color: $facebook-color;
    color: white;
    border: none;
    &:hover {
      background-position: right center;
    }
  }
  &.submit {
    background-image: $fency-color-secondary;
    color: white;
    border: none;
    &:hover {
      background-position: right center;
    }
  }
  &.submit-mobile {
    border-radius: 180px;
    background-image: $fency-color;
    color: white;
    border: none;
    &:hover {
      background-position: right center;
    }
  }
}
</style>
