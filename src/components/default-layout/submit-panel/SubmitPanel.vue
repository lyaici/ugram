<template>
  <div class="submit-panel">
    <h1>Submit a photo</h1>
    <Input v-model="image.description" name="title" type="text" label="Title"
    placeholder="Enter your photo title"/>
    <TagsInput v-model="image.mentions" name="mentions" type="text" label="Mentions"/>
    <TagsInput v-model="image.tags" name="tags" type="text" label="Tags"/>
    <Input @file="handleFile" name="file" type="file" label="Choose a photo"/>
    <span class="error">{{ error }}</span>
    <Button type="primary" @click.native="submit()">Submit my photo</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Input, Button, TagsInput } from '@/components/utils';
import { ImageSubmit, User } from '@/types';
import { AxiosResponse } from 'axios';

export default Vue.extend({
  name: 'SubmitPanel',
  data: () => ({
    image: {
      description: '',
      mentions: [],
      tags: [],
    } as ImageSubmit,
    file: {} as File,
    error: '',
  }),
  computed: {
    currentUser(): User {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    handleFile(file: File) {
      this.file = file;
    },
    async submit() {
      if (this.file.name) {
        this.$store.dispatch('submitImage', { id: this.currentUser.id, image: this.image, file: this.file });
        this.$emit('closeModal');
      } else this.error = 'Please select a file';
    },
  },
  components: {
    Input,
    Button,
    TagsInput,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
.submit-panel {
  display: flex;
  flex-direction: column;
  background-color: white;
  background-clip: padding-box;
  box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  @media screen and (min-width: $mobile) {
    border-radius: 5px;
  }
  h1 {
    margin-top: 50px;
    color: $secondary-color;
  }
  .input {
    width: 90%;
  }
  span {
    margin-top: 10px;
  }
  .button {
    width: 90%;
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
}
</style>
