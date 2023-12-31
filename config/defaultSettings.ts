import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'becoze UserCenter',
  pwa: false,
  logo: 'https://raw.githubusercontent.com/becoze/becozePictureHosting/main/usercenter/profile_img.jpg',
  iconfontUrl: '',
};

export default Settings;
