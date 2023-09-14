import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Divider, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, Link } from 'umi';
import styles from './index.less';
import { GITHUB_PROJECT_LINK, SYSTEM_LOGO } from '@/constants';
import type { API } from '@/services/ant-design-pro/typings';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  // 提交注册按钮
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userPassword, checkPassword } = values;
    if (userPassword !== checkPassword) {
      message.error('Password and Confirm Password not match!');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = 'Registration successful!';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Registration failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="becoze UserCenter"
          subTitle={
            <a href={GITHUB_PROJECT_LINK} target="_blank" rel="noreferrer">
              becoze User-Center management system by Liyuan Liang
            </a>
          }
          submitter={{
            searchConfig: {
              submitText: 'Register',
            },
          }}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'Account Register'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="New User Account"
                rules={[
                  {
                    required: true,
                    message: 'User Account is required!',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: 'User account length should be at least 4 characters!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Account Password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password length must not be less than 8!',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Password length must not be less than 8!',
                  },
                ]}
              />
              <ProFormText
                name="userCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="User Code (any number you like)"
                rules={[
                  {
                    required: true,
                    message: 'User code is required!',
                  },
                  {
                    max: 15,
                    type: 'string',
                    message: 'User code must not be greater than 15 characters!',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space size={[1, 1]} wrap split={<Divider type="vertical" />}>
              <Link to="/user/login">Go to Login</Link>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
