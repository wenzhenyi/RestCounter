import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '利息计算器',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '计算器',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: 'LPR管理',
    //   path: '/table',
    //   component: './Table',
    // },
    {
      name: 'LPR管理',
      path: '/lprManage',
      component: './LprManage',
    },
  ],
  npmClient: 'yarn',
});

