import { useState } from 'react';
import {
  Button,
  Select,
  Upload,
  Modal,
  Typography,
  Space,
  Card,
  Table,
  Image,
  Input,
} from '@douyinfe/semi-ui';
import { recImg } from './const';

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

  // 初始化识别文本状态
  const [recognizedTexts, setRecognizedTexts] = useState<
    Record<string, string>
  >(() => {
    const initialTexts: Record<string, string> = {};
    recImg.forEach(item => {
      initialTexts[item.label] = item.text || '';
    });
    return initialTexts;
  });

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

  // 处理识别文本变化
  const handleTextChange = (label: string, value: string) => {
    setRecognizedTexts(prev => ({
      ...prev,
      [label]: value,
    }));
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

      <Card title="图片展示" className="h-fit">
        <Table dataSource={recImg} pagination={false} size="small">
          <Table.Column
            title="序号"
            dataIndex="label"
            key="label"
            width={80}
            align="center"
            render={text => (
              <div className="font-medium text-gray-700">#{text}</div>
            )}
          />
          <Table.Column
            title="低分辨率"
            dataIndex="lowImg"
            key="lowImg"
            width={200}
            align="center"
            render={(lowImg, record) => (
              <div className="flex justify-center">
                <Image
                  src={lowImg}
                  alt={`原图 ${record.label}`}
                  width={150}
                  // height={100}
                  className="rounded border object-cover"
                  preview={{
                    src: lowImg,
                  }}
                />
              </div>
            )}
          />
          <Table.Column
            title="高分辨率"
            dataIndex="highImg"
            key="highImg"
            width={200}
            align="center"
            render={(highImg, record) => (
              <div className="flex justify-center">
                <Image
                  src={highImg}
                  alt={`超分辨率图 ${record.label}`}
                  width={150}
                  // height={100}
                  className="rounded border object-cover"
                  preview={{
                    src: highImg,
                  }}
                />
              </div>
            )}
          />
          <Table.Column
            title="识别文本"
            dataIndex="text"
            key="text"
            width={180}
            align="center"
            render={(text, record) => (
              <div className="px-2">
                <Input
                  value={recognizedTexts[record.label] || ''}
                  onChange={value => handleTextChange(record.label, value)}
                  placeholder="请输入识别结果"
                  size="small"
                  className="text-sm"
                />
              </div>
            )}
          />
          <Table.Column
            title="操作"
            key="compare"
            width={120}
            align="center"
            render={(_, record) => (
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  // 实现图片对比功能
                  Modal.info({
                    title: `图片 ${record.label} 对比`,
                    width: 800,
                    content: (
                      <div className="space-y-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-2">
                            识别结果
                          </div>
                          <div className="text-lg font-mono font-medium text-blue-700">
                            {recognizedTexts[record.label] || '无识别结果'}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="mb-2 font-medium">低分辨率</div>
                            <Image
                              src={record.lowImg}
                              alt={`原图 ${record.label}`}
                              width="100%"
                              className="rounded border"
                            />
                          </div>
                          <div className="text-center">
                            <div className="mb-2 font-medium">高分辨率</div>
                            <Image
                              src={record.highImg}
                              alt={`超分辨率图 ${record.label}`}
                              width="100%"
                              className="rounded border"
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  });
                }}
              >
                对比查看
              </Button>
            )}
          />
        </Table>
      </Card>

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
