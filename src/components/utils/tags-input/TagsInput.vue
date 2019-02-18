<template>
  <div class="input">
    <label v-if="label" :for="name">{{ label }}</label>
    <div class="tags-input">
      <Tag v-for="(tag, index) in tags" :key="index" :value="tag" @deleteTag="deleteTag"></Tag>
      <input :id="name" v-model="inputValue" @input="onInput">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tag from '@/components/utils/tag';

export default Vue.extend({
  name: 'TagsInput',
  components: {
    Tag,
  },
  model: {
    prop: 'value',
    event: 'input',
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
  },
  computed: {
    tags: {
      get(): any {
        return this.value || [];
      },
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    onInput(value: TextEvent): void {
      if (value.data === ' ') {
        this.$emit('input', this.tags !== null ? this.tags.concat(this.inputValue.split(' ')[0]) : this.inputValue.split(' ')[0]);
        this.inputValue = '';
      }
    },
    deleteTag(value: string): void {
      if (this.tags !== null) {
        this.$emit('input', this.tags.filter((t: string):Boolean => t !== value));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.input {
  width: 100%;
  .tags-input {
    width: 100%;
    border-radius: 10px;
    box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
    border: none;
    outline: none;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    color: #696969;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    input{
      padding: 15px 0;
      flex-grow: 1;
      margin: 0 0 0 0.5rem;
      border: none;
      outline: none;
      background-color: white;
    }
  }
}
</style>
