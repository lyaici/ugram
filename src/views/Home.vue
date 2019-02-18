<template>
  <div class="home">
    <tab-bar selected="images"></tab-bar>
    <banner :image="bannerImage" title="Discover a world of art"
    placeholder="Search between thousands of images"></banner>
    <grid @image="handleImage" :images="images"></grid>
    <modal size="large" v-if="modal" @closeModal="modal = handleModal(modal)">
      <image-panel @closeModal="modal = handleModal(modal)" :image="image"></image-panel>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  TabBar,
  Banner,
  Grid,
  Modal,
  ImagePanel,
} from '@/components/utils';
import { Image } from '@/types';
import HandleModal from '@/mixins';

export default Vue.extend({
  name: 'home',
  data: () => ({
    image: {} as Image,
    modal: false as boolean,
  }),
  computed: {
    images(): Image[] {
      return this.$store.getters.getImages;
    },
    bannerImage(): string {
      return this.$store.getters.getHomeBannerImage;
    },
  },
  methods: {
    handleScroll(e: Event) {
      const element: HTMLElement = document.documentElement as HTMLElement;
      const bottom: boolean = element.scrollTop + window.innerHeight === element.offsetHeight;
      if (bottom) this.$store.dispatch('loadNewImagesPage');
    },
    handleImage(image: Image) {
      this.image = image;
      this.modal = HandleModal.methods.handleModal(this.modal);
    },
  },
  mixins: [HandleModal],
  components: {
    TabBar,
    Banner,
    Grid,
    Modal,
    ImagePanel,
  },
  mounted() {
    if (this.bannerImage === '') this.$store.dispatch('loadHomeBannerImage');
    this.$store.dispatch('loadInitialImages');
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  },
});
</script>

<style lang="scss" scoped>
.home {
  .banner {
    margin-bottom: 20px;
  }
  .grid {
    margin-bottom: 20px;
  }
}
</style>
