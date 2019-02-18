<template>
  <div class="profile">
    <info @openModal="editmodal = handleModal(editmodal)" :user="user"></info>
    <grid @image="handleImage" v-if="images[0]" :images="images"></grid>
    <h2 v-else >No images found</h2>
    <modal @closeModal="editmodal = handleModal(editmodal)" v-if="editmodal">
      <edit-panel @closeModal="editmodal = handleModal(editmodal)" :user="user"></edit-panel>
    </modal>
    <modal size="large" @closeModal="imagemodal = handleModal(imagemodal)" v-if="imagemodal">
      <image-panel @closeModal="imagemodal = handleModal(imagemodal)" :image="image"></image-panel>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Info, EditPanel } from '@/components/profile';
import { Grid, Modal, ImagePanel } from '@/components/utils';
import UsersVue from '@/views/Users.vue';
import { User, Image } from '@/types';
import HandleModal from '@/mixins';

export default Vue.extend({
  name: 'Profile',
  data: () => ({
    user: {} as User,
    images: [] as Image[],
    image: {} as Image,
    pageToLoad: 1,
    imagemodal: false as boolean,
    editmodal: false as boolean,
  }),
  props: {
    id: {
      required: true,
    },
  },
  methods: {
    async handleScroll(e: Event) {
      const element: HTMLElement = document.documentElement as HTMLElement;
      const bottom: boolean = element.scrollTop + window.innerHeight === element.offsetHeight;
      if (bottom) {
        const images: Image[] = await this.$store.dispatch('loadNewProfileImagesPage', { id: this.id, page: this.pageToLoad });
        if (images.length) {
          this.pageToLoad += 1;
          images.forEach((image) => {
            this.images.push(image);
          });
        }
      }
    },
    handleImage(image: Image) {
      this.image = image;
      this.imagemodal = HandleModal.methods.handleModal(this.imagemodal);
    },
  },
  mixins: [HandleModal],
  components: {
    Info,
    Grid,
    EditPanel,
    Modal,
    ImagePanel,
  },
  async mounted() {
    this.user = await this.$store.dispatch('loadProfile', this.$route.params.id);
    this.images = await this.$store.dispatch('loadInitialProfileImages', this.$route.params.id);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: $mobile) {
    .info {
      margin-top: 100px;
      margin-bottom: 100px;
    }
  }
  @media screen and (max-width: $mobile) {
    .info {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
  .grid {
    margin-bottom: 20px;
  }
}
</style>
