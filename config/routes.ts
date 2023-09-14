export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: 'Login', path: '/user/login', component: './user/Login' },
      { name: 'Register', path: '/user/register', component: './user/Register' },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: 'Welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'Admin page',
    icon: 'icon-administrator',
    // 从access.ts中传递过来canAdmin值是否位true-管理员，false-普通用户
    access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: 'User management',
        component: './Admin/UserManage',
      },
      {
        path: '/admin/add-user',
        name: 'Add new user',
        component: './Admin/AddUser',
      },
      { component: './404' },
    ],
  },
  { name: 'Profile', icon: 'user', path: '/user-info', component: './UserInfo' },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
