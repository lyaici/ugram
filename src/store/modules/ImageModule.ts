import { ugram, unsplash } from '@/services';
import { Module } from 'vuex';
import { ImageState, RootState } from '../states-types';
import { Image } from '@/types';
import { AxiosResponse } from 'axios';

const ImageModule: Module<ImageState, RootState> = {
  state: {
    images: [],
    pageToLoad: 1,
    homeBannerImage: '',
    usersBannerImage: '',
  },
  getters: {
    getImages(state: ImageState): Image[] {
      return state.images;
    },
    getHomeBannerImage(state: ImageState): string {
      return state.homeBannerImage;
    },
    getUsersBannerImage(state: ImageState): string {
      return state.usersBannerImage;
    },
  },
  mutations: {
    setInitialImages(state: ImageState, payload: Image[]) {
      state.images = payload;
      state.pageToLoad = 1;
    },
    pushNewImagesPage(state: ImageState, payload: Image[]) {
      payload.forEach((image) => {
        state.images.push(image);
      });
    },
    setPageToLoad(state: ImageState, payload: number) {
      state.pageToLoad += 1;
    },
    setHomeBannerImage(state: ImageState, payload: string) {
      state.homeBannerImage = payload;
    },
    setUsersBannerImage(state: ImageState, payload: string) {
      state.usersBannerImage = payload;
    },
  },
  actions: {
    async loadInitialImages(context) {
      const response: AxiosResponse = await ugram.get('/pictures');
      context.commit('setInitialImages', response.data.items);
    },
    async loadNewImagesPage(context) {
      const { pageToLoad } = context.state;
      const response: AxiosResponse = await ugram.get(`/pictures?page=${pageToLoad}`);
      if (response.data.items.length) {
        context.commit('pushNewImagesPage', response.data.items);
        context.commit('setPageToLoad');
      }
    },
    async loadInitialProfileImages(context, id): Promise<Image[]> {
      const response: AxiosResponse = await ugram.get(`/users/${id}/pictures`);
      return response.data.items;
    },
    async loadNewProfileImagesPage(context, { id, page }) {
      const response: AxiosResponse = await ugram.get(`/users/${id}/pictures?page=${page}`);
      return response.data.items;
    },
    async submitImage(context, { id, image, file }) {
      const payload: FormData = new FormData();
      const mentions: string = image.mentions.join();
      const tags: string = image.tags.join();
      payload.set('description', image.description);
      payload.set('mentions', mentions);
      payload.set('tags', tags);
      payload.append('file', file);
      await ugram.post(`/users/${id}/pictures`, payload, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      context.dispatch('loadInitialImages');
    },
    async deleteImage(context, { userId, id }) {
      await ugram.delete(`/users/${userId}/pictures/${id}`);
      context.dispatch('loadInitialImages');
    },
    async updateImage(context, { userId, id, image }) {
      await ugram.put(`/users/${userId}/pictures/${id}`, image);
      context.dispatch('loadInitialImages');
    },
    async loadHomeBannerImage(context) {
      const response: AxiosResponse = await unsplash.get('/photos/random/?query=landscapes&orientation=landscape');
      context.commit('setHomeBannerImage', response.data.urls.regular);
    },
    async loadUsersBannerImage(context) {
      const response: AxiosResponse = await unsplash.get('/photos/random/?query=peoples+friends&orientation=landscape');
      context.commit('setUsersBannerImage', response.data.urls.regular);
    },
  },
};

export default ImageModule;
