import { Helmet } from '@edenx/runtime/head';
import { useNavigate } from '@edenx/runtime/router';
import { Button, Card, Typography, Space } from '@douyinfe/semi-ui';
import './index.css';

const { Title, Text } = Typography;

const Index = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://lf3-static.bytednsdoc.com/obj/eden-cn/upspbovhj/edenx-ico.ico"
        />
      </Helmet>

      <div className="text-center mb-12">
        <Title heading={1} className="text-4xl font-bold text-gray-800 mb-4">
          文本识别系统
        </Title>
        <Text className="text-xl text-gray-600">
          基于先进AI技术的智能文本识别与处理平台
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <div
            className="text-center p-6"
            onClick={() => {
              navigate('/recognize');
            }}
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-blue-600">📄</span>
            </div>
            <Title heading={4} className="mb-2">
              文本识别
            </Title>
            <Text type="tertiary" className="mb-4">
              上传图片或文档，快速提取其中的文本内容
            </Text>
            <Button
              type="primary"
              onClick={e => {
                e.stopPropagation();
                navigate('/recognize');
              }}
            >
              立即使用 →
            </Button>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <Title heading={4} className="mb-2">
              批量处理
            </Title>
            <Text type="tertiary" className="mb-4">
              支持批量上传文件，一次性处理多个文档
            </Text>
            <Button disabled>即将上线</Button>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <Title heading={4} className="mb-2">
              多语言翻译
            </Title>
            <Text type="tertiary" className="mb-4">
              识别结果支持多种语言翻译，打破语言壁垒
            </Text>
            <Button disabled>即将上线</Button>
          </div>
        </Card>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <Title heading={3} className="text-center mb-8">
          系统特性
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🚀</span>
            </div>
            <Title heading={5} className="mb-2">
              高精度识别
            </Title>
            <Text type="tertiary" size="small">
              采用最新OCR技术，识别准确率高达99%
            </Text>
          </div>

          <div className="text-center">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">⚡</span>
            </div>
            <Title heading={5} className="mb-2">
              快速处理
            </Title>
            <Text type="tertiary" size="small">
              毫秒级响应，大幅提升工作效率
            </Text>
          </div>

          <div className="text-center">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🔒</span>
            </div>
            <Title heading={5} className="mb-2">
              安全可靠
            </Title>
            <Text type="tertiary" size="small">
              企业级安全保障，数据传输加密
            </Text>
          </div>

          <div className="text-center">
            <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📱</span>
            </div>
            <Title heading={5} className="mb-2">
              多端支持
            </Title>
            <Text type="tertiary" size="small">
              支持多种文件格式和设备类型
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
