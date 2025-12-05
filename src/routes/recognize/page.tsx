import { useState } from 'react';
import {
  Button,
  Select,
  Upload,
  Modal,
  Typography,
  Space,
  Card,
} from '@douyinfe/semi-ui';

const { Title, Text } = Typography;

interface TitleBarProps {
  onUpload: () => void;
  onBatchDelete: () => void;
  onBatchTranslate: () => void;
  selectedModel: string;
  onModelChange: (
    value: string | number | any[] | Record<string, any> | undefined,
  ) => void;
}

const TitleBar = ({
  onUpload,
  onBatchDelete,
  onBatchTranslate,
  selectedModel,
  onModelChange,
}: TitleBarProps) => {
  const modelOptions = [
    { value: 'ocr-v1', label: 'OCR 基础模型 v1.0' },
    { value: 'ocr-v2', label: 'OCR 增强模型 v2.0' },
    { value: 'ocr-handwriting', label: 'OCR 手写识别模型' },
    { value: 'ocr-formula', label: 'OCR 公式识别模型' },
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Title heading={4} className="mb-0">
            文本识别系统
          </Title>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Text className="text-gray-600">识别模型：</Text>
            <Select
              value={selectedModel}
              onChange={onModelChange}
              style={{ width: 200 }}
              placeholder="选择识别模型"
            >
              {modelOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          <Space>
            <Button type="primary" onClick={onUpload}>
              📤 点击上传
            </Button>
            <Button type="danger" onClick={onBatchDelete}>
              🗑️ 批量删除
            </Button>
            <Button onClick={onBatchTranslate}>🌐 批量翻译</Button>
          </Space>
        </div>
      </div>
    </Card>
  );
};

const RecognizePage = (): JSX.Element => {
  const [selectedModel, setSelectedModel] = useState('ocr-v2');
  const [uploadVisible, setUploadVisible] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const handleUpload = () => {
    setUploadVisible(true);
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除选中的文件吗？此操作不可恢复。',
      onOk: () => {
        // 实现批量删除逻辑
        console.log('执行批量删除');
      },
    });
  };

  const handleBatchTranslate = () => {
    Modal.confirm({
      title: '确认翻译',
      content: '确定要对选中的识别结果进行批量翻译吗？',
      onOk: () => {
        // 实现批量翻译逻辑
        console.log('执行批量翻译');
      },
    });
  };

  const handleModelChange = (
    value: string | number | any[] | Record<string, any> | undefined,
  ) => {
    setSelectedModel(value as string);
  };

  const handleFileChange = (object: any) => {
    setFiles(object.fileList || []);
  };

  return (
    <div className="min-h-full">
      <TitleBar
        onUpload={handleUpload}
        onBatchDelete={handleBatchDelete}
        onBatchTranslate={handleBatchTranslate}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：文件上传和列表 */}
        <Card title="文件管理" className="h-fit">
          <div className="space-y-4">
            <Upload
              action=""
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full"
            >
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <div className="text-4xl text-gray-400 mb-4">📁</div>
                <Text className="block mb-2">点击或拖拽文件到此处上传</Text>
                <Text type="tertiary" size="small">
                  支持 JPG、PNG、PDF、DOC、DOCX 格式
                </Text>
              </div>
            </Upload>

            {files.length > 0 && (
              <div className="mt-4">
                <Text strong>已上传文件 ({files.length})</Text>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        size="small"
                        type="danger"
                        onClick={() => {
                          const newFiles = files.filter((_, i) => i !== index);
                          setFiles(newFiles);
                        }}
                      >
                        🗑️
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 右侧：识别结果 */}
        <Card title="识别结果" className="h-fit">
          <div className="min-h-64 flex items-center justify-center text-gray-500">
            {files.length === 0 ? (
              <Text type="tertiary">请先上传文件进行识别</Text>
            ) : (
              <div className="w-full">
                <Text type="tertiary" className="block mb-4">
                  使用模型：{selectedModel}
                </Text>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Text type="tertiary">识别结果将在此处显示...</Text>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 上传模态框 */}
      <Modal
        title="文件上传"
        visible={uploadVisible}
        onCancel={() => setUploadVisible(false)}
        footer={null}
        width={600}
      >
        <Upload
          action=""
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
            <div className="text-5xl text-gray-400 mb-4">📤</div>
            <Title heading={5} className="mb-2">
              选择文件上传
            </Title>
            <Text type="tertiary">
              支持 JPG、PNG、PDF、DOC、DOCX 格式，可批量上传
            </Text>
          </div>
        </Upload>
      </Modal>
    </div>
  );
};

export default RecognizePage;
