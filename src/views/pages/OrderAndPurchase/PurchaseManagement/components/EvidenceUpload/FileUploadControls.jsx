import React from 'react';
import { Select, Form } from 'antd';
import UploadButton from './UploadButton';

const { Option } = Select;

const fileTypeOptions = [
  { value: 'receipts', label: 'Recibos' },
  { value: 'invoices', label: 'Facturas' },
  { value: 'others', label: 'Otros' },
];

const FileUploadControls = ({ fileType, setFileType, handleFileInput }) => {
  if (!handleFileInput) {
    return null;
  }

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', }}>
      <Form.Item label="Tipo">
        <Select
          value={fileType}
          style={{ width: 120 }}
          onChange={value => setFileType(value)}
          
        >
          {fileTypeOptions.map(option => (
            <Option key={option.value} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Adjuntar Evidencia">
        <UploadButton onFileInput={handleFileInput} />
      </Form.Item>
    </div>
  );
};

export default FileUploadControls;