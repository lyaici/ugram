<template>
  <div class="info">
    <img v-if="user.pictureUrl" :src="`${user.pictureUrl}?height=250&width=250`">
    <img  v-else src="@/assets/navbar/user-logo_tmp.jpeg">
    <div class="user-info">
      <h1 class="light">{{ user.firstName }} {{ user.lastName }}</h1>
      <span>Discover beautiful photos by {{ user.firstName }}</span>
    </div>
    <Button @click.native="$emit('openModal')" v-if="currentUser.id && currentUser.id === user.id"
    type="edit">Edit profile</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button } from '@/components/utils';
import { User } from '@/types';

export default Vue.extend({
  name: 'Info',
  computed: {
    currentUser(): User {
      return this.$store.getters.getCurrentUser;
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    Button,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.info {
  display: flex;
  @media screen and (min-width: $mobile){
    flex-direction: row;
    align-items: flex-start;
    img {
      width: 200px;
      margin-right: 40px;
    }
    .button {
      margin-top: 25px;
      margin-left: -80px;
    }
  }
  @media screen and (max-width: $mobile){
    flex-direction: column;
    align-items: center;
    text-align: center;
    img {
      width: 100px;
      margin-left: 15px;
         margin-right: 20px;
    }
    .button {
      margin-top: 10px;
    }
  }
  img {
    border-radius: 180px;
  }
}
</style>
