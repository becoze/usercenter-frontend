import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Popconfirm, Space, Tag } from 'antd';
import { useRef } from 'react';
import { deleteUser, searchUsers, updateUserInfoByAdmin } from '@/services/ant-design-pro/api';
import { ProFormSelect } from '@ant-design/pro-form';
import { selectAvatarUrl, selectGender, selectUserRole, selectUserStatus } from '@/constants';
import type { API } from '@/services/ant-design-pro/typings';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

// 定义列对应后端字段
const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    align: 'center',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    // tip: 'User name',
    align: 'center',
  },
  {
    title: 'Account',
    dataIndex: 'userAccount',
    copyable: true,
    align: 'center',
  },
  {
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width="80px" height="80px" />
      </div>
    ),
    copyable: true,
    align: 'center',
  },
  {
    title: 'Code',
    dataIndex: 'userCode',
    copyable: true,
    align: 'center',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    copyable: true,
    align: 'center',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
    align: 'center',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      Male: { text: <Tag>Male</Tag> },
      Female: { text: <Tag>Female</Tag> },
      Other: { text: <Tag>Other</Tag> },
    },
    align: 'center',
  },
  {
    title: 'User Status',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: { text: <Tag color="success">Normal</Tag>, status: 'Success' },
      // 1: { text: <Tag color="warning">Logout</Tag>, status: 'Default' },
      1: { text: <Tag color="error">Banned</Tag>, status: 'Error' },
    },
    align: 'center',
  },
  {
    title: 'User Role',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      user: { text: <Tag color="default">User</Tag> },
      admin: { text: <Tag color="success">Admin</Tag> },
    },
    align: 'center',
  },
  {
    title: 'Create Time',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    align: 'center',
  },
  {
    title: 'Actions',
    align: 'center',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Space wrap>
        <ModalForm<API.CurrentUser>
          title="Modify user information"
          trigger={<Button type={'link'}>Modify</Button>}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          submitTimeout={2000}
          onFinish={async (values) => {
            await waitTime(1000);
            //点击了提交
            console.log('values is-------');
            //发起请求
            values.id = record.id;
            const isModify = await updateUserInfoByAdmin(values);
            if (isModify) {
              message.success('Submitted successfully');
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
              placeholder="Username"
              initialValue={record.username}
            />
            <ProFormText
              width="md"
              name="userAccount"
              label="User Account"
              placeholder="Account"
              initialValue={record.userAccount}
              rules={[
                {
                  min: 4,
                  message: 'User account length should be at least 4 characters!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="userCode"
              label="User Code"
              placeholder="Code"
              initialValue={record.userCode}
            />
            <ProFormSelect
              name="gender"
              fieldProps={{
                size: 'large',
              }}
              label="Gender"
              options={selectGender}
              placeholder="Gender"
              initialValue={record.gender}
              rules={[
                {
                  message: 'Please choose gender',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="phone"
              label="Phone number"
              placeholder="Phone"
              initialValue={record.phone}
            />
            <ProFormText
              width="md"
              name="email"
              label="Email"
              placeholder="Email"
              initialValue={record.email}
            />
            <ProFormSelect
              name="avatarUrl"
              fieldProps={{
                size: 'large',
              }}
              label="User Avatar"
              options={selectAvatarUrl}
              placeholder={'User Avatar'}
              initialValue={record.avatarUrl}
              rules={[
                {
                  message: 'Please choose user avatar',
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
              initialValue={record.userStatus}
              placeholder={'Choose user status'}
              rules={[
                {
                  required: true,
                  message: 'Please choose user status',
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
              initialValue={record.userRole}
              placeholder={'User Role'}
              rules={[
                {
                  required: true,
                  message: 'Please choose User Role',
                },
              ]}
            />
            <ProFormText.Password
              width="lg"
              name="userPassword"
              label="User Password"
              placeholder="New Password"
              rules={[
                {
                  min: 8,
                  type: 'string',
                  message: 'Password length must not be less than 8!',
                },
              ]}
            />
          </ProForm.Group>
        </ModalForm>

        <a key="view">
          <Popconfirm
            title="Delete User"
            // description="你确定要删除他吗？"
            onConfirm={async (e) => {
              console.log(e);
              console.log(record.id);
              const id = record.id;
              const isDelete = await deleteUser({ id: id });
              if (isDelete) {
                message.success('Deleted successfully');
                // 刷新用户信息表单
                location.reload();
              } else {
                message.error('Deletion failed');
              }
            }}
            onCancel={(e) => {}}
            okText="Yes"
            cancelText="No"
          >
            <Space direction={'vertical'} size={[1, 1]} wrap>
              <Button type={'link'} danger>
                Delete
              </Button>
            </Space>
          </Popconfirm>
        </a>
      </Space>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // 获取后端的数据，返回到表格
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const userList = await searchUsers();
        return { data: userList };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="User Database"
    />
  );
};
