import { ugram } from '@/services';
import { Module } from 'vuex';
import { UserState, RootState } from '../states-types';
import { User } from '@/types';
import { AxiosResponse } from 'axios';

const UserModule: Module<UserState, RootState> = {
  state: {
    users: [],
    pageToLoad: 1,
    currentUser: {} as User,
  },
  getters: {
    getUsers(state: UserState): User[] {
      return state.users;
    },
    getCurrentUser(state: UserState): User {
      return state.currentUser;
    },
  },
  mutations: {
    setInitialUsers(state: UserState, payload: User[]) {
      state.users = payload;
    },
    pushNewUsersPage(state: UserState, payload: User[]) {
      payload.forEach((user) => {
        state.users.push(user);
      });
    },
    setPageToLoad(state: UserState) {
      state.pageToLoad += 1;
    },
    login(state: UserState) {
      state.currentUser = {
        id: 'team14',
        email: 'ugramteam14@gmail.com',
        firstName: 'Team',
        lastName: '14',
        phoneNumber: 4186562131,
        pictureUrl: '',
        registrationDate: 1549061953000,
      };
    },
    logout(state: UserState) {
      state.currentUser = {} as User;
    },
  },
  actions: {
    async loadInitialUsers(context) {
      if (!context.state.users.length) {
        const response: AxiosResponse = await ugram.get('/users');
        context.commit('setInitialUsers', response.data.items);
      }
    },
    async loadNewUsersPage(context) {
      const { pageToLoad } = context.state;
      const response: AxiosResponse = await ugram.get(`/users?page=${pageToLoad}`);
      if (response.data.items.length) {
        context.commit('pushNewUsersPage', response.data.items);
        context.commit('setPageToLoad');
      }
    },
    async loadProfile(context, id): Promise<User> {
      const response: AxiosResponse = await ugram.get(`/users/${id}`);
      return response.data;
    },
    async updateCurrentUser(context, { id, newUser }) {
      const response: AxiosResponse = await ugram.put(`/users/${id}`, newUser);
    },
  },
};

export default UserModule;
