<template>
  <div class="edit-panel">
    <h1>Edit Profile</h1>
    <Input v-model="newUser.email" name="email" type="email" label="Email Address"
    placeholder="Enter your email address"/>
    <Input v-model="newUser.firstName" name="firstName" type="text" label="First Name"
    placeholder="Enter your firstname"/>
    <Input v-model="newUser.lastName" name="lastName" type="text" label="Last Name"
    placeholder="Enter your lastname"/>
    <Input v-model="newUser.phoneNumber" name="phone" type="tel" label="Phone Number"
    placeholder="Enter your phone number"/>
    <Button type="primary" @click.native="submit()">Save changes</Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Input, Button } from '@/components/utils';
import { UserEdit } from '@/types';

export default Vue.extend({
  name: 'EditPanel',
  data: () => ({
    newUser: {} as UserEdit,
  }),
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('updateCurrentUser', { id: this.user.id, newUser: this.newUser });
      this.$emit('closeModal');
    },
  },
  components: {
    Input,
    Button,
  },
  created() {
    this.newUser = {
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.edit-panel {
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
  .button {
    width: 90%;
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
}
</style>
