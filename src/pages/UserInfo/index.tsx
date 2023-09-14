import React, { useEffect, useState } from 'react';
import { Descriptions, Divider } from 'antd';
import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { Image, Button, message } from 'antd';
import { request } from 'umi';
import { modifyPassword, userModify } from '@/services/ant-design-pro/api';
import { DEFAULT_AVATAR_URL, selectAvatarUrl, selectGender } from '@/constants';
import type { API } from '@/services/ant-design-pro/typings';
import { ProFormSelect } from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UserInfo: React.FC = () => {
  const [myUser, setMyUser] = useState({
    id: 0,
    username: '',
    userAccount: '',
    avatarUrl: '',
    gender: 'Male',
    phone: '',
    email: '',
    userStatus: 0,
    userRole: 'user',
    createTime: '',
    userCode: -1,
  });
  useEffect(() => {
    async function fetch() {
      await request('/api/user/current', { method: 'GET' }).then((res) => {
        setMyUser(res);
      });
    }

    fetch();
  }, []);
  console.log('currentUser:', myUser);
  return (
    <>
      <Divider>Avatar</Divider>
      <Descriptions style={{ margin: '20px', marginLeft: '700px' }}>
        <Descriptions.Item>
          <Image
            src={myUser.avatarUrl === null ? DEFAULT_AVATAR_URL : myUser.avatarUrl}
            width={300}
            height={300}
          />
        </Descriptions.Item>
      </Descriptions>
      <Divider>Profile</Divider>
      <Descriptions bordered column={4}>
        <Descriptions.Item label="Username" span={1.5}>
          {myUser.username}
        </Descriptions.Item>
        <Descriptions.Item label="User Account" span={1.5}>
          {myUser.userAccount}
        </Descriptions.Item>
        <Descriptions.Item label="User Role" span={1.5}>
          {myUser.userRole}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" span={1.5}>
          {myUser.gender}
        </Descriptions.Item>
        <Descriptions.Item label="User Code" span={1.5}>
          {myUser.userCode}
        </Descriptions.Item>
        <Descriptions.Item label="Create Time" span={1.5}>
          {myUser.createTime}
        </Descriptions.Item>
        <Descriptions.Item label="User Status" span={1.5}>
          {myUser.userStatus === 0 ? 'Normal' : 'Banned'}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={1.5}>
          {myUser.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {myUser.email}
        </Descriptions.Item>
      </Descriptions>

      <ModalForm<API.CurrentUser>
        title="Modifly Information (Current user)"
        trigger={
          <Button type="primary" shape="round" style={{ marginTop: '100px', marginLeft: '700px' }}>
            Modifly Information
          </Button>
        }
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          //点击发起请求
          values.id = myUser.id;
          const isModify = await userModify(values);
          if (isModify) {
            message.success('Modified successfully');
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="username"
            label="Username"
            placeholder="New username"
            initialValue={myUser.username}
          />
          <ProFormText
            width="md"
            name="userCode"
            label="User Code"
            placeholder="New user code"
            initialValue={myUser.userCode}
          />
          <ProFormText
            width="md"
            name="phone"
            label="Phone number"
            placeholder="New phone number"
            initialValue={myUser.phone}
          />
          <ProFormSelect
            name="gender"
            fieldProps={{
              size: 'large',
            }}
            label="Gender"
            options={selectGender}
            placeholder="Gender"
            initialValue={myUser.gender}
            rules={[
              {
                message: 'Please choose gender',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="Email address"
            placeholder="New Email address"
            initialValue={myUser.email}
          />
          <ProFormSelect
            name="avatarUrl"
            fieldProps={{
              size: 'large',
            }}
            label="User Avatar"
            options={selectAvatarUrl}
            placeholder={'Please select a user avatar'}
            initialValue={myUser.avatarUrl}
            rules={[
              {
                message: 'Please select a user avatar from the list',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>

      <ModalForm<API.ModifyPasswordParam>
        title="Change Password"
        trigger={
          <Button danger shape="round" style={{ margin: '50px' }}>
            Change Password
          </Button>
        }
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(1000);
          const { userPassword, newPassword } = values;
          if (userPassword === newPassword) {
            message.error('The new password cannot be the same as the old password');
            return false;
          }
          //点击了提交
          const isModify = await modifyPassword(values);
          if (isModify) {
            message.success('Password changed successfully');
            // 刷新用户信息表单
            location.reload();
            return true;
          }
          return false;
        }}
      >
        <ProForm.Group>
          <ProFormText.Password
            width="md"
            name="userPassword"
            label="Current Password"
            tooltip={'Current Password is required!'}
            rules={[
              { required: true },
              { min: 8, message: 'Password cannot be less than 8 characters!' },
            ]}
            placeholder="Old Password is required!"
          />
          <ProFormText.Password
            width="md"
            name="newPassword"
            label="New Passwords"
            tooltip={'New Password is required, the Password cannot be less than 8 characters!'}
            rules={[
              { required: true },
              { min: 8, message: 'Password cannot be less than 8 characters!' },
            ]}
            placeholder="New Password is required!"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};

export default UserInfo;
