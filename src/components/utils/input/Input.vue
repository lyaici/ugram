<template>
  <div :class="['input', type]">
    <label v-if="label" :for="name">{{ label }}</label>
    <span class="fency" v-if="type === 'file'">{{ fileName }}</span>
    <input v-if="type === 'file'" :id="name" type="file" accept="image/*"
    @change="handleFiles($event)">
    <input v-else :id="name" :type="type" :value="value" :placeholder="placeholder"
    @input="$emit('text', $event.target.value)">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Input',
  data: () => ({
    fileName: 'No file selected' as string,
  }),
  model: {
    prop: 'value',
    event: 'text',
  },
  methods: {
    handleFiles(event: Event) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      this.$emit('file', file);
      this.fileName = file.name;
    },
  },
  props: {
    value: {
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      required: false,
    },
    type: {
      type: String,
      required: true,
      default: 'text',
      validator: (type: string) => ['text', 'email', 'password', 'date', 'file', 'tel', 'comment'].indexOf(type) > -1,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.input {
  width: 100%;
  &.email, &.password, &.text, &.tel {
    input {
      width: 100%;
      border-radius: 10px;
      box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
      border: none;
      outline: none;
      background-color: white;
      padding: 15px 0;
      text-indent: 20px;
      margin-top: 10px;
      margin-bottom: 30px;
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
      color: #696969;
    }
  }
  &.file {
    input {
      display: none;
    }
    label {
      background-image: $fency-color-secondary;
      border-radius: 5px;
      display: inline-block;
      padding: 10px;
      background-size: 200% auto;
      transition: 0.7s;
      cursor: pointer;
      color: white;
      margin-right: 10px;
      &:hover {
        background-position: right center;
      }
    }
  }
  &.comment {
    input {
      width: 100%;
      border-radius: 10px;
      box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
      border: none;
      outline: none;
      background-color: white;
      padding: 15px 0;
      text-indent: 20px;
      margin-top: 10px;
      margin-bottom: 30px;
      font-family: 'Roboto', sans-serif;
      font-size: 15px;
      color: #696969;
    }
  }
}
</style>
