import { useState } from 'react';
import { useNavigate } from '@edenx/runtime/router';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Checkbox,
  Divider,
  Space,
} from '@douyinfe/semi-ui';
import { Helmet } from '@edenx/runtime/head';

const { Title, Text } = Typography;

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (values: any) => {
    console.log('登录信息:', values);
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setLoading(false);
      // 这里可以添加实际的登录逻辑
      navigate('/');
    }, 1000);
  };

  const handleRegister = () => {
    // 跳转到注册页面的逻辑
    console.log('跳转到注册页面');
  };

  const handleForgotPassword = () => {
    // 忘记密码的逻辑
    console.log('忘记密码');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 mt-[-100px]">
      <Helmet>
        <title>登录 - 文本识别系统</title>
      </Helmet>

      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl text-white">📄</span>
            </div>
            <Title heading={2} className="text-gray-800 mb-2">
              文本识别系统
            </Title>
            <Text type="tertiary" className="text-gray-600">
              请输入您的账户信息登录系统
            </Text>
          </div>

          <Form onSubmit={handleLogin} className="space-y-6">
            <Form.Input
              field="email"
              label="用户名"
              size="large"
              className="w-full"
            />

            <Form.Input
              field="password"
              label="密码"
              placeholder="请输入密码"
              mode="password"
              size="large"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度至少6位' },
              ]}
              className="w-full"
            />

            <div className="flex items-center justify-between">
              <Checkbox>记住密码</Checkbox>

              <Button
                theme="borderless"
                type="primary"
                size="small"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-700"
              >
                忘记密码？
              </Button>
            </div>

            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              loading={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-lg hover:shadow-xl transition-all duration-200 !text-white"
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </Form>

          <Divider margin="24px">
            <Text type="tertiary" size="small">
              或
            </Text>
          </Divider>

          <div className="space-y-4">
            <Button
              block
              size="large"
              className="border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50"
            >
              <div className="flex items-center justify-center">
                <span className="mr-2">🔗</span>
                使用SSO登录
              </div>
            </Button>

            <div className="text-center">
              <Text type="tertiary" className="mr-2">
                还没有账户？
              </Text>
              <Button
                theme="borderless"
                type="primary"
                size="small"
                onClick={handleRegister}
                className="text-blue-600 hover:text-blue-700 p-0"
              >
                立即注册
              </Button>
            </div>
          </div>
        </Card>

        {/* <div className="text-center mt-8">
          <Text type="tertiary" size="small" className="text-gray-500">
            © 2024 文本识别系统. 保留所有权利.
          </Text>
        </div> */}
      </div>

      {/* 装饰性背景元素 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default LoginPage;
