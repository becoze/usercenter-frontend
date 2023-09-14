import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-form';
import { message, Tabs } from 'antd';
import { create } from '@/services/ant-design-pro/api';
import { SYSTEM_LOGO } from '@/constants';
import { selectAvatarUrl, selectGender, selectUserRole, selectUserStatus } from '@/constants';

export default () => {
  const handleCreate = async (values: API.CreateParams) => {
    try {
      // 创建用户
      const suc = await create(values);
      if (suc) {
        const defaultLoginSuccessMessage = 'Created successfully!';
        message.success(defaultLoginSuccessMessage);
        location.reload();
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = 'Registration failed, please try again!';
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        submitter={{
          searchConfig: {
            submitText: 'Add new user',
          },
        }}
        logo={SYSTEM_LOGO}
        title="becoze UserCenter"
        subTitle="becoze User-Center management system by Liyuan Liang"
        onFinish={async (values) => {
          await handleCreate(values as API.CreateParams);
        }}
      >
        <Tabs centered activeKey={'account'}>
          <Tabs.TabPane key={'account'} tab={'Create and insert a new account'} />
        </Tabs>
        {
          <>
            <ProFormText
              name="username"
              label="New Username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder="Username"
              rules={[
                {
                  message: 'Username is required!',
                },
              ]}
            />
            <ProFormText
              name="userAccount"
              label="User Account "
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder="User Account "
              rules={[
                {
                  required: true,
                  message: 'User account is required',
                },
                {
                  min: 4,
                  message: 'User account length should be at least 4 characters',
                },
              ]}
            />
            <ProFormText.Password
              name="userPassword"
              label="User Password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Password'}
              rules={[
                {
                  required: true,
                  message: 'Please enter the password!',
                },
                {
                  min: 8,
                  message: 'Password length must not be less than 8',
                },
              ]}
            />
            <ProFormText
              name="userCode"
              label="User Code"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Any number you want'}
              rules={[
                {
                  max: 15,
                  message: 'User Code must not be greater than 15 characters',
                },
                {
                  message: 'User Code is required',
                },
              ]}
            />

            <ProFormText
              name="phone"
              label="Phone number"
              fieldProps={{
                size: 'large',
                prefix: <PhoneOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Phone number'}
              rules={[
                {
                  message: 'Phone number is required',
                },
              ]}
            />
            <ProFormText
              name="email"
              label="Email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Email'}
              rules={[
                {
                  message: 'Email is required',
                },
              ]}
            />
            <ProFormSelect
              name="avatarUrl"
              fieldProps={{
                size: 'large',
              }}
              label="User Avatar"
              options={selectAvatarUrl}
              placeholder={'Please choose the user avatar'}
              rules={[
                {
                  message: 'Please choose the user avatar',
                },
              ]}
            />
            <ProFormSelect
              name="gender"
              fieldProps={{
                size: 'large',
              }}
              label="Gender"
              options={selectGender}
              placeholder="Please choose the gender"
              rules={[
                {
                  message: 'Please choose the user gender',
                },
              ]}
            />
            <ProFormSelect
              name="userStatus"
              fieldProps={{
                size: 'large',
              }}
              label="User Status"
              options={selectUserStatus}
              placeholder={'Please choose the user status'}
              initialValue={'Normal'}
              rules={[
                {
                  required: true,
                  message: 'Please choose the user status',
                },
              ]}
            />
            <ProFormSelect
              name="userRole"
              fieldProps={{
                size: 'large',
              }}
              label="User Role"
              options={selectUserRole}
              placeholder={'Please choose the user role'}
              initialValue={'User'}
              rules={[
                {
                  required: true,
                  message: 'Please choose the user role',
                },
              ]}
            />
          </>
        }
        <div
          style={{
            marginBlockEnd: 24,
          }}
        />
      </LoginForm>
    </div>
  );
};
