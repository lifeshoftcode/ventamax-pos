import React from 'react';
import { Table, Typography, Tag, Image, Tooltip } from 'antd';
import { WarningOutlined, PictureOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import type { CompareResult } from '../types.ts';

const { Text } = Typography;

const SortableTable = styled(Table<CompareResult>)`
  .ant-table-thead > tr > th {
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProductImage = styled(Image)`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`;

const HasImageIcon = styled(PictureOutlined)`
  color: #1890ff;
  font-size: 16px;
`;

interface ResultsTableProps {
  data: CompareResult[];
  loading?: boolean;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ data, loading }) => {
  const columns = [
    {
      title: 'Imagen',
      key: 'image',
      width: 70,
      render: (_: any, record: CompareResult) => {
        const images = record.dbData?.images ?? [];
        const hasImage = images.length > 0;
        const imageUrl = hasImage ? images[0] : null;

        return (
          <ImageContainer>
            {imageUrl ? (
              <ProductImage
                src={imageUrl}
                alt={record.name}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jDz5s1b+Z4gwsYQGgJQpVLHqqqqngAPA0@@"
                preview={false}
              />
            ) : (
              <Tooltip title={hasImage ? "Tiene imagen en base de datos" : "Sin imagen"}>
                <HasImageIcon style={{ color: hasImage ? '#1890ff' : '#d9d9d9' }} />
              </Tooltip>
            )}
          </ImageContainer>
        );
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: CompareResult, b: CompareResult) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      render: (text: string, record: CompareResult) => (
        <div>
          {text}
          {record.conflict && (
            <Tag color="orange" style={{ marginLeft: 8 }}>
              <WarningOutlined /> Conflicto
            </Tag>
          )}
          {record.excelOnly && (
            <Tag color="blue" style={{ marginLeft: 8 }}>
              Solo en Excel
            </Tag>
          )}
          {record.dbOnly && (
            <Tag color="green" style={{ marginLeft: 8 }}>
              Solo en BD
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Código de Barras',
      dataIndex: 'barcode',
      key: 'barcode',
      sorter: (a: CompareResult, b: CompareResult) => (a.barcode || '').localeCompare(b.barcode || ''),
      render: (text: string, record: CompareResult) => (
        <div>
          {text}
          {record.conflict && record.conflictFields?.includes('barcode') && (
            <div style={{ color: 'orange' }}>
              <Text type="danger">
                Excel: {record.excelData?.barcode}
              </Text>
              <br />
              <Text type="warning">
                BD: {record.dbData?.barcode}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Precio',
      key: 'price',
      sorter: (a: CompareResult, b: CompareResult) => {
        const priceA = a.excelData?.pricing?.price || a.dbData?.pricing?.price || 0;
        const priceB = b.excelData?.pricing?.price || b.dbData?.pricing?.price || 0;
        return priceA - priceB;
      },
      render: (_: any, record: CompareResult) => {
        if (record.conflict && record.conflictFields?.includes('price')) {
          return (
            <div>
              <Text type="danger">
                Excel: ${record.excelData?.pricing?.price || 0}
              </Text>
              <br />
              <Text type="warning">
                BD: ${record.dbData?.pricing?.price || 0}
              </Text>
            </div>
          );
        }
        
        return `$${record.excelData?.pricing?.price || record.dbData?.pricing?.price || 0}`;
      },
    },
    {
      title: 'Stock',
      key: 'stock',
      sorter: (a: CompareResult, b: CompareResult) => {
        const stockA = a.excelData?.stock || a.dbData?.stock || 0;
        const stockB = b.excelData?.stock || b.dbData?.stock || 0;
        return stockA - stockB;
      },
      render: (_: any, record: CompareResult) => {
        if (record.conflict && record.conflictFields?.includes('stock')) {
          return (
            <div>
              <Text type="danger">
                Excel: {record.excelData?.stock || 0}
              </Text>
              <br />
              <Text type="warning">
                BD: {record.dbData?.stock || 0}
              </Text>
            </div>
          );
        }
        
        return record.excelData?.stock || record.dbData?.stock || 0;
      },
    },
    {
      title: 'Categoría',
      key: 'category',
      sorter: (a: CompareResult, b: CompareResult) => {
        const catA = (a.excelData?.category || a.dbData?.category || '').toLowerCase();
        const catB = (b.excelData?.category || b.dbData?.category || '').toLowerCase();
        return catA.localeCompare(catB);
      },
      render: (_: any, record: CompareResult) => {
        if (record.conflict && record.conflictFields?.includes('category')) {
          return (
            <div>
              <Text type="danger">
                Excel: {record.excelData?.category || 'N/A'}
              </Text>
              <br />
              <Text type="warning">
                BD: {record.dbData?.category || 'N/A'}
              </Text>
            </div>
          );
        }
        
        return record.excelData?.category || record.dbData?.category || 'N/A';
      },
    }
  ];

  return (
    <SortableTable 
      columns={columns} 
      dataSource={data} 
      rowKey="id"
      loading={loading}
      pagination={{ 
        pageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '20', '50', '100'] 
      }}
    />
  );
};