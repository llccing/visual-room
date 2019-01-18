import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/center',
      name: 'center',
      component: () => import(/* webpackChunkName: 'center' */ './views/center/index'),
      children: [
        {
          path: 'demo1',
          name: 'centerDemo1',
          component: () => import(/* webpackChunkName: 'centerDemo1' */ './views/center/demo1'),
        },
        {
          path: 'assembly',
          name: 'centerAssembly',
          component: () => import('./views/center/assembly')
        },
      ],
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('./views/cabinet/index'),
      children: [
        {
          path: 'demo1',
          name: 'cabinetDemo1',
          component: () => import('./views/cabinet/demo1'),
        },
      ],
    },
    {
      path: '/device',
      name: 'device',
      component: () => import('./views/device/index'),
      children: [
        {
          path: 'demo1',
          name: 'deviceDemo1',
          component: () => import('./views/device/demo1'),
        },
      ],
    },
  ],
});
