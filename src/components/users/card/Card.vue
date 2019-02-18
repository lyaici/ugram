<template>
  <div class="card">
    <div class="user-logo">
      <img v-if="user.pictureUrl" :src="`${user.pictureUrl}?height=250&width=250`">
      <img v-else src="@/assets/navbar/user-logo_tmp.jpeg">
    </div>
    <div class="user-info">
      <span class="dark">{{ user.firstName }} {{ user.lastName }}</span>
      <span class="light">{{ user.email }}</span>
    </div>
    <router-link :to="{ name:'Profile', params: { id: user.id }}">
      <div class="button">
        <div class="line"/>
        <a class="fency">See my profile</a>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.card {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: -1px -1px 6px 0 rgba(0, 0, 0, 0.1), 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  min-width: 255px;
  min-height: 370px;
  margin-bottom: 20px;
  justify-content: space-around;
  .user-logo {
    img {
      width: 160px;
      border-radius: 180px;
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: inherit;
    span {
      margin-bottom: 10px;
    }
  }
  a {
    width: 100%;
    .button {
      text-align: center;
      width: 100%;
      .line {
        margin-bottom: 20px;
        height: 1px;
        background-image: $fency-color-text;
      }
    }
  }
}
</style>
