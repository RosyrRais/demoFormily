import { useState } from 'react';
import { useNavigate } from '@edenx/runtime/router';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Avatar,
  Upload,
  Tabs,
  TabPane,
  Select,
  DatePicker,
  Space,
  Divider,
  Toast,
} from '@douyinfe/semi-ui';
import { Helmet } from '@edenx/runtime/head';

const { Title, Text } = Typography;

const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 模拟用户数据
  const [userInfo, setUserInfo] = useState({
    username: 'admin',
    email: 'admin@example.com',
    phone: '13800138000',
    realName: '张三',
    department: '技术部',
    position: '高级工程师',
    birthday: new Date('1990-01-01'),
    gender: 'male',
    bio: '专注于AI技术研发，热爱编程和创新。',
  });

  const handleInfoSubmit = (values: any) => {
    console.log('更新个人信息:', values);
    setLoading(true);

    // 模拟API请求
    setTimeout(() => {
      setLoading(false);
      Toast.success('个人信息更新成功！');
      setUserInfo({ ...userInfo, ...values });
    }, 1000);
  };

  const handlePasswordSubmit = (values: any) => {
    console.log('修改密码:', values);
    setPasswordLoading(true);

    // 模拟API请求
    setTimeout(() => {
      setPasswordLoading(false);
      Toast.success('密码修改成功！');
    }, 1000);
  };

  const handleAvatarChange = (fileList: any) => {
    console.log('头像上传:', fileList);
    Toast.success('头像上传成功！');
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <Helmet>
        <title>个人中心 - 文本识别系统</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-6">
          <Title heading={2} className="text-gray-800">
            个人中心
          </Title>
          <Text type="tertiary">管理您的个人信息和账户设置</Text>
        </div>

        {/* 用户信息卡片 */}
        <Card className="mb-6 shadow-sm">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar
                size="large"
                style={{ width: 80, height: 80 }}
                className="bg-blue-500"
              >
                {userInfo.realName.charAt(0)}
              </Avatar>
              <Upload
                action=""
                accept="image/*"
                showUploadList={false}
                onChange={handleAvatarChange}
                className="absolute -bottom-2 -right-2"
              >
                <Button
                  size="small"
                  icon="📷"
                  className="rounded-full w-8 h-8 flex items-center justify-center bg-white shadow-md"
                />
              </Upload>
            </div>

            <div className="flex-1">
              <Title heading={4} className="mb-1">
                {userInfo.realName}
              </Title>
              <Text type="tertiary" className="block mb-1">
                @{userInfo.username}
              </Text>
              <Text type="tertiary" size="small">
                {userInfo.department} · {userInfo.position}
              </Text>
            </div>

            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </Card>

        {/* 设置选项卡 */}
        <Card className="shadow-sm">
          <Tabs type="line">
            <TabPane tab="个人信息" itemKey="info">
              <div className="pt-4">
                <Form
                  initValues={userInfo}
                  onSubmit={handleInfoSubmit}
                  className="max-w-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Input
                      field="realName"
                      label="真实姓名"
                      placeholder="请输入真实姓名"
                      rules={[{ required: true, message: '请输入真实姓名' }]}
                    />

                    <Form.Input
                      field="username"
                      label="用户名"
                      placeholder="请输入用户名"
                      rules={[{ required: true, message: '请输入用户名' }]}
                    />

                    <Form.Input
                      field="email"
                      label="邮箱地址"
                      placeholder="请输入邮箱地址"
                      rules={[
                        { required: true, message: '请输入邮箱地址' },
                        { type: 'email', message: '请输入有效的邮箱地址' },
                      ]}
                    />

                    <Form.Input
                      field="phone"
                      label="手机号码"
                      placeholder="请输入手机号码"
                      rules={[{ required: true, message: '请输入手机号码' }]}
                    />

                    <Form.Input
                      field="department"
                      label="所属部门"
                      placeholder="请输入所属部门"
                    />

                    <Form.Input
                      field="position"
                      label="职位"
                      placeholder="请输入职位"
                    />

                    <Form.Select
                      field="gender"
                      label="性别"
                      placeholder="请选择性别"
                      style={{ width: '100%' }}
                    >
                      <Select.Option value="male">男</Select.Option>
                      <Select.Option value="female">女</Select.Option>
                      <Select.Option value="other">其他</Select.Option>
                    </Form.Select>

                    <Form.DatePicker
                      field="birthday"
                      label="出生日期"
                      placeholder="请选择出生日期"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <Form.TextArea
                    field="bio"
                    label="个人简介"
                    placeholder="请输入个人简介"
                    rows={3}
                    className="mt-6"
                    maxCount={200}
                  />

                  <Divider />

                  <div className="flex justify-end space-x-4">
                    <Button onClick={() => window.location.reload()}>
                      重置
                    </Button>
                    <Button htmlType="submit" type="primary" loading={loading}>
                      {loading ? '保存中...' : '保存更改'}
                    </Button>
                  </div>
                </Form>
              </div>
            </TabPane>

            <TabPane tab="账户安全" itemKey="security">
              <div className="pt-4">
                <div className="max-w-md">
                  <Title heading={5} className="mb-4">
                    修改密码
                  </Title>
                  <Text type="tertiary" className="block mb-6">
                    为了账户安全，请定期更改您的密码
                  </Text>

                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Input
                      field="currentPassword"
                      label="当前密码"
                      placeholder="请输入当前密码"
                      mode="password"
                      rules={[{ required: true, message: '请输入当前密码' }]}
                    />

                    <Form.Input
                      field="newPassword"
                      label="新密码"
                      placeholder="请输入新密码"
                      mode="password"
                      rules={[
                        { required: true, message: '请输入新密码' },
                        { min: 6, message: '密码长度至少6位' },
                      ]}
                    />

                    <Form.Input
                      field="confirmPassword"
                      label="确认新密码"
                      placeholder="请再次输入新密码"
                      mode="password"
                      rules={[{ required: true, message: '请确认新密码' }]}
                    />

                    <Divider />

                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={passwordLoading}
                      block
                    >
                      {passwordLoading ? '修改中...' : '修改密码'}
                    </Button>
                  </Form>
                </div>

                <Divider className="my-8" />

                {/* 其他安全设置 */}
                <div>
                  <Title heading={5} className="mb-4">
                    其他安全设置
                  </Title>

                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Text strong>两步验证</Text>
                        <Text type="tertiary" size="small" className="block">
                          通过手机短信验证码增强账户安全
                        </Text>
                      </div>
                      <Button size="small">设置</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Text strong>登录设备管理</Text>
                        <Text type="tertiary" size="small" className="block">
                          查看和管理您的登录设备
                        </Text>
                      </div>
                      <Button size="small">查看</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div>
                        <Text strong className="text-red-600">
                          注销账户
                        </Text>
                        <Text type="tertiary" size="small" className="block">
                          永久删除您的账户和所有数据
                        </Text>
                      </div>
                      <Button size="small" type="danger" theme="borderless">
                        注销
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
