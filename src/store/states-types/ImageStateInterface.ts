import { Image } from '@/types';

export default interface ImageState {
  images: Image[],
  pageToLoad: number,
  homeBannerImage: string,
  usersBannerImage: string,
}