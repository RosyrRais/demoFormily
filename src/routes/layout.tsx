import { Outlet, useNavigate } from '@edenx/runtime/router';
import {
  Layout as SemiLayout,
  Nav,
  Button,
  Avatar,
  Dropdown,
  Typography,
} from '@douyinfe/semi-ui';
import './index.css';

const { Header, Sider, Content } = SemiLayout;
const { Text } = Typography;

const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const userMenu = (
    <Dropdown.Menu>
      <Dropdown.Item>👤 个人中心</Dropdown.Item>
      <Dropdown.Item>⚙️ 系统设置</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>🚪 退出登录</Dropdown.Item>
    </Dropdown.Menu>
  );

  const navItems = [
    {
      itemKey: '/',
      text: '🏠 首页',
    },
    {
      itemKey: '/recognize',
      text: '📄 文本识别',
    },
  ];

  return (
    <SemiLayout className="h-screen">
      <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="text-xl font-bold text-gray-800 mr-8">
            文本识别系统
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Text className="text-gray-600">欢迎您，管理员</Text>
          <Dropdown trigger="click" content={userMenu} position="bottomRight">
            <Avatar size="small" className="cursor-pointer bg-blue-500">
              U
            </Avatar>
          </Dropdown>
        </div>
      </Header>

      <SemiLayout>
        <Sider
          className="bg-white border-r border-gray-200"
          style={{ width: 240 }}
        >
          <div>
            <Nav
              items={navItems}
              onSelect={({ itemKey }) => {
                navigate(itemKey + '');
              }}
              className="border-none"
              limitIndent={false}
            />
          </div>
        </Sider>

        <Content className="bg-gray-50 p-6">
          <Outlet />
        </Content>
      </SemiLayout>
    </SemiLayout>
  );
};

export default Layout;
