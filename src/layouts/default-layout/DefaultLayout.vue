<template>
  <div class="default-layout">
    <navbar @openModal="modal = handleModal(modal)"></navbar>
    <container>
      <router-view/>
    </container>
    <Button type="submit-mobile"
    @click.native="modal = handleModal(modal)" v-if="currentUser.id">
      <font-awesome-icon class="fa" icon="plus" :style="{ color: '#ffffff' }"/>
    </Button>
    <modal v-if="modal" @closeModal="modal = handleModal(modal)">
      <submit-panel @closeModal="modal = handleModal(modal)" ></submit-panel>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Navbar, Container, SubmitPanel } from '@/components/default-layout';
import { Modal, Button } from '@/components/utils';
import HandleModal from '@/mixins';
import { User } from '@/types';

export default Vue.extend({
  name: 'DefaultLayout',
  data: () => ({
    modal: false as boolean,
  }),
  computed: {
    currentUser(): User {
      return this.$store.getters.getCurrentUser;
    },
  },
  components: {
    Navbar,
    Container,
    SubmitPanel,
    Modal,
    Button,
  },
  mixins: [HandleModal],
  methods: {
    handleScroll(e: Event) {
      const navbar: Element = document.getElementsByClassName('navbar')[0];
      if (!navbar.classList.contains('scrolled') && window.scrollY >= 90) navbar.className = 'navbar scrolled';
      else if (navbar.classList.contains('scrolled') && window.scrollY < 90) navbar.className = 'navbar';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  },
});
</script>


<style lang="scss" scoped>
@import '@/styles/display.scss';

.default-layout {
  .container {
    &.modal {
      position: fixed;
    }
  }
  @media screen and (min-width: $mobile){
    .button {
      display: none;
    }
  }
  @media screen and (max-width: $mobile){
    .button{
      margin: 10px;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 1;
      box-shadow: -1px 0px 40px 0px rgba(0,0,0,0.40);
      padding: 15px;
      min-width: 0;
      .fa{
        font-size: 20px;
      }
    }
  }
}
</style>
