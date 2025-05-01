import React from 'react';
import { Upload, Button, Space, Typography } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Text } = Typography;

const UploadContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px dashed #d9d9d9;
`;

interface FileUploaderProps {
  fileList: any[];
  onFileChange: (fileList: any[]) => void;
  onCompare: () => void;
  onDownloadTemplate: () => void;
  loading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  fileList,
  onFileChange,
  onCompare,
  onDownloadTemplate,
  loading
}) => {
  const uploadProps = {
    beforeUpload: (file: any) => {
      onFileChange([file]);
      return false;
    },
    fileList,
    onRemove: () => {
      onFileChange([]);
    },
    accept: '.xlsx,.xls',
    maxCount: 1
  };

  return (
    <UploadContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>Seleccione un archivo Excel para comparar con la base de datos:</Text>
        <Space>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
          <Button 
            type="primary" 
            onClick={onCompare} 
            disabled={fileList.length === 0 || loading}
            loading={loading}
          >
            Comparar
          </Button>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={onDownloadTemplate}
          >
            Descargar plantilla
          </Button>
        </Space>
      </Space>
    </UploadContainer>
  );
};