<template>
  <div class="sign-in">
    <div class="content">
      <Form></Form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Form from '@/components/sign-in/form';

export default Vue.extend({
  name: 'SignIn',
  components: {
    Form,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.sign-in {
  .content {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    @media screen and (min-width: $mobile) {
      padding: 0 20px;
    }
    max-width: 930px;
    max-height: 750px;
    min-width: 280px;
    .form {
      height: 650px;
    }
  }
}
</style>
