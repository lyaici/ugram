import { User } from '@/types';

export default interface UserState {
  users: User[],
  pageToLoad: number,
  currentUser: User,
}