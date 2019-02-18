import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from '@/layouts/default-layout';
import VideoLayout from '@/layouts/video-layout';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import Profile from '@/views/Profile.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import Test from '@/views/Test.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
        },
        {
          path: '/profile/:id',
          name: 'Profile',
          component: Profile,
          props: true,
        },
        {
          path: '/test',
          name: 'Test',
          component: Test,
        },
      ],
    },
    {
      path: '/',
      component: VideoLayout,
      children: [
        {
          path: '/login',
          name: 'SignIn',
          component: SignIn,
        },
        {
          path: '/register',
          name: 'SignUp',
          component: SignUp,
        },
      ],
    },
  ],
});
