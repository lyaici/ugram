<template>
  <div class="image-panel">
    <div class="top">
      <div class="title">
        <Input v-if="editMode" v-model="newImage.description"
        name="title" type="text"/>
        <h2 v-else>{{ image.description }}</h2>
      </div>
      <div v-if="editMode" class="settings">
        <Button @click.native="handleDelete" type="delete">Delete</Button>
        <Button @click.native="handleSave">Save</Button>
      </div>
      <div v-else-if="currentUser.id && currentUser.id === user.id" class="edit">
        <Button @click.native="handleEdit" type="edit">Edit</Button>
      </div>
    </div>
    <div class="photo">
      <img :src="image.url">
      <div class="tags-edit" v-if="editMode">
        <TagsInput v-model="newImage.tags" name="tags" type="text"/>
      </div>
      <div class="tags" v-else>
        <a v-for="(tag, index) in image.tags" class="tag light" :key="index">#{{ tag }}</a>
      </div>
      <div class="mentions-edit" v-if="editMode">
        <TagsInput v-model="newImage.mentions" name="mentions" type="text"/>
      </div>
      <div class="mentions" v-else>
        <a v-for="(mention, index) in image.mentions" class="mention light"
        :key="index">@{{ mention }}</a>
      </div>
    </div>
    <div @click="handleProfile" class="user">
      <img v-if="user.pictureUrl" :src="`${user.pictureUrl}?height=250&width=250`">
      <img v-else src="@/assets/navbar/user-logo_tmp.jpeg">
      <span class="light">{{ user.firstName }} {{ user.lastName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User, ImageSubmit } from '@/types';
import { Button, Input } from '@/components/utils';
import TagsInput from '@/components/utils/tags-input';

export default Vue.extend({
  name: 'ImagePanel',
  data: () => ({
    user: {} as User,
    editMode: false as boolean,
    newImage: {} as ImageSubmit,
  }),
  computed: {
    currentUser(): User {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    handleProfile() {
      this.$emit('closeModal');
      this.$router.push({ name: 'Profile', params: { id: this.user.id } });
    },
    handleEdit() {
      this.editMode = true;
    },
    handleDelete() {
      this.$store.dispatch('deleteImage', { userId: this.user.id, id: this.image.id });
      this.$emit('closeModal');
    },
    handleSave() {
      this.$store.dispatch('updateImage', { userId: this.user.id, id: this.image.id, image: this.newImage });
      this.$emit('closeModal');
    },
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  components: {
    Button,
    Input,
    TagsInput,
  },
  async mounted() {
    this.user = await this.$store.dispatch('loadProfile', this.image.userId);
    this.newImage = {
      description: this.image.description,
      mentions: this.image.mentions,
      tags: this.image.tags,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.image-panel {
  display: flex;
  flex-direction: column;
  background-color: white;
  background-clip: padding-box;
  box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  @media screen and (min-width: $mobile) {
    border-radius: 5px;
    .title {
      .input {
        margin-left: 30px;
      }
    }
    .edit {
      margin-right: 30px;
    }
    .settings {
      margin-top: 15px;
    }
  }
  @media screen and (max-width: $mobile) {
    .title {
      .input {
        margin-left: 10px;
        margin-right: 10px;
        width: 150px;
      }
    }
    .settings {
      display: flex;
      flex-direction: row;
      align-items: center;
      .button {
        min-width: 50px;
        padding: 8px 10px;
        margin-right: 5px;
      }
    }
    .edit {
      margin-right: 20px;
      .button {
        min-width: 50px;
        padding: 8px 10px;
        margin-right: 5px;
      }
    }
    .photo {
      margin-bottom: 10px;
    }
  }
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    .title {
      margin-top: 10px;
      margin-bottom: 20px;
      h2 {
        text-indent: 30px;
      }
    }
    .edit {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .settings {
      margin-bottom: 20px;
      margin-right: 30px;
      .button {
        margin-bottom: 5px;
      }
    }
  }
  .photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1500px;
    padding: 0 20px;
    margin-bottom: 20px;
    img {
      object-fit: cover;
      margin-bottom: 30px;
      max-width: 100%;
      max-height: 900px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      align-self: flex-start;
      align-items: center;
      .tag {
        margin-bottom: 5px;
        margin-right: 10px;
        padding: 2px 20px;
        border: 1px solid $main-color;
        border-radius: 2px;
      }
    }
    .mentions {
      display: flex;
      flex-wrap: wrap;
      align-self: flex-start;
      align-items: center;
      margin-top: 10px;
      .mention {
        margin-right: 10px;
      }
    }
    .tags-edit {
      align-self: flex-start;
    }
    .mentions-edit {
      align-self: flex-start;
    }
  }
  .user {
    display: flex;
    align-items: center;
    text-indent: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
    align-self: flex-start;
    cursor: pointer;
    img {
      width: 50px;
      border-radius: 180px;
    }
  }
}
</style>
