import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Alert, Divider, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, Link, useModel } from 'umi';
import styles from './index.less';
import { GITHUB_PROJECT_LINK, LINKEDIN_CONTACT, SYSTEM_LOGO } from '@/constants';
import type { API } from '@/services/ant-design-pro/typings';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({
        ...values,
        type,
      });
      if (user) {
        const defaultLoginSuccessMessage = 'Login successful!';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = 'Login failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
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
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Login',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'User Account Login'} />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'Incorrect account or password'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Account"
                rules={[
                  {
                    required: true,
                    min: 4,
                    message: 'User Account is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Password"
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
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space size={[0, 0]} wrap split={<Divider type="vertical" />}>
              <a
                style={{
                  float: 'left',
                  marginBottom: '-21px',
                }}
              >
                <ProFormCheckbox name="autoLogin">Remember me</ProFormCheckbox>
              </a>

              <a
                style={{
                  float: 'right',
                }}
                href={LINKEDIN_CONTACT}
                target="_blank"
                rel="noreferrer"
              >
                Forgot Password
              </a>

              <Link to="/user/register">Register</Link>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
