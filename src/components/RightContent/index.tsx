import { QuestionCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
// @ts-ignore
import { useModel } from 'umi';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import { LINKEDIN_PROFILE } from '@/constants';

export type SiderTheme = 'light' | 'dark';
const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const { navTheme, layout } = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Search"
        defaultValue="--click--"
        options={[
          {
            label: <a href="https://github.com/becoze">github</a>,
            value: 'github',
          },
          {
            label: <a href="https://becoze.github.io/">My Blog</a>,
            value: 'My Blog (click me!!!)',
          },
          {
            label: <a href="https://www.linkedin.com/in/liyuan-liang/">LinkedIn</a>,
            value: 'LinkedIn',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          window.open(LINKEDIN_PROFILE);
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
