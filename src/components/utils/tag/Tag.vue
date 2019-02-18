<template>
  <div class="tag">
    <span class="text">{{value}}</span>
    <font-awesome-icon class="fa" icon="times" :style="{ color: '#696969' }" @click="deleteTag"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Tag',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteTag(): void {
      this.$emit('deleteTag', this.value);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/typography.scss';

.tag{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  background-color: $third-color;
  margin: 0.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  .text{
    width: min-content;
    font-family: 'Roboto', sans-serif;
    color: $main-color;
    margin-right: 5px;
  }
  .fa{
    &:hover{
      cursor: pointer;
      opacity: 0.5;
    }
  }
}
</style>
