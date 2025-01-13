import React, { useState } from 'react';
import { Table, Button, Input, Form, InputNumber, DatePicker, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatMoney, formatPercentage } from '../../../../../utils/formatters';
import dayjs from 'dayjs';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  onSave,
  onCloseEdit,
  setDateModalVisible,
  setSelectedRecord,
  ...restProps
}) => {
  const getInput = () => {
    if (inputType === 'number') {
      return <InputNumber onBlur={(e) => onSave(record, dataIndex, e.target.value)} autoFocus />;
    }
    if (inputType === 'date') {
      // En lugar de mostrar el DatePicker directamente, abrimos el modal
      return children;
    }
    return <Input onBlur={(e) => onSave(record, dataIndex, e.target.value)} autoFocus />;
  };

  const handleDateCellClick = () => {
    if (inputType === 'date' && record.editable !== false) {
      setSelectedRecord(record);
      setDateModalVisible(true);
      return;
    }
    restProps.onClick?.();
  };

  return (
    <td
      {...restProps}
      onClick={handleDateCellClick} // Mover el onClick aquí
      style={{ cursor: 'pointer' }} // Opcional: Cambiar cursor al pasar sobre la celda
    >
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          noStyle
          rules={['freight', 'otherCosts'].includes(dataIndex) ? [] : [
            { required: true }
          ]}
        >
          {getInput()}
        </Form.Item>
      ) : (
        <div 
          className="editable-cell-value-wrap"
          style={{ 
            paddingRight: 24,
            whiteSpace: 'nowrap',
          }}
        >
          {dataIndex === 'expirationDate' && record[dataIndex] 
            ? dayjs(record[dataIndex]).format('DD/MM/YY') // Format milliseconds
            : children}
        </div>
      )}
    </td>
  );
};

const ProductsTable = ({ products, removeProduct, onEditProduct }) => {
  const [editingCell, setEditingCell] = useState({ row: '', col: '' });
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();

  const isEditing = (record, dataIndex) => 
    editingCell.row === record.key && editingCell.col === dataIndex;

  const edit = (record, dataIndex) => {
    const value = record[dataIndex];
    // Convertir timestamp a momento para DatePicker si es necesario
    const formValue = dataIndex === 'expirationDate' && value 
      ? dayjs(value) 
      : value;
      
    form.setFieldsValue({ [dataIndex]: formValue });
    setEditingCell({ row: record.key, col: dataIndex });
  };

  const handleSave = (record, dataIndex, value) => {
    const finalValue = dataIndex === 'expirationDate' 
      ? (value ? dayjs(value).valueOf() : null) // Ensure milliseconds
      : value;

    const newData = { ...record, [dataIndex]: finalValue };
    onEditProduct({ ...newData, index: record.key });
    setEditingCell({ row: '', col: '' });
  };

  const handleDateModalOk = (date) => {
    if (selectedRecord) {
      const timestamp = date ? dayjs(date).startOf('day').valueOf() : null; // Ensure milliseconds
      handleSave(selectedRecord, 'expirationDate', timestamp);
    }
    setDateModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    { 
      title: 'Producto', 
      dataIndex: 'name',
      width: 200,
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {text}
        </span>
      )
    },
    {
      title: 'F. Expiración',
      dataIndex: 'expirationDate',
      render: (value) => value ? dayjs(value).format('DD/MM/YY') : '-',
      editable: true,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      render: (value) => value,
      editable: true,
    },
  
    { title: 'Unid. Medida', dataIndex: 'unitMeasurement', editable: true },
    {
      title: 'Costo Base',
      dataIndex: 'baseCost',
      render: (value) => formatMoney(value),      editable: true,
    },
    {
      title: 'ITBIS',
      dataIndex: 'taxPercentage',
      render: (value) => !value || value == 0 ? 'Exento' : formatPercentage(value),
      editable: true,
    },
    {
      title: 'Flete',
      dataIndex: 'freight',
      render: (value) => formatMoney(value),
      editable: true,
    },
    {
      title: 'Otros Costos',
      dataIndex: 'otherCosts',
      render: (value) => formatMoney(value),
      editable: true,
    },
    {
      title: 'Costo Unitario',
      dataIndex: 'unitCost',
      render: (value) => formatMoney(value),

    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      fixed: 'right',
      render: (value) => formatMoney(value),
    },
    {
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end'
          }}
        >

          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => removeProduct(record.index)}
          />
        </div>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'expirationDate' ? 'date' : 
                  ['quantity', 'baseCost', 'taxPercentage', 'freight', 'otherCosts'].includes(col.dataIndex) ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record, col.dataIndex),
        onSave: handleSave,
        onClick: () => edit(record, col.dataIndex),
        onCloseEdit: () => setEditingCell({ row: '', col: '' }),
        setDateModalVisible,
        setSelectedRecord,
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          className="editable-row-table"
          size='small'
          scroll={{ x: 1300 }}
          columns={mergedColumns}
          dataSource={products.map((product, index) => ({
            ...product,
            key: index
          }))}
          rowKey={(record, index) => index}
          onRow={() => ({})} // Asegurar que no haya conflictos con eventos en las filas
        />
      </Form>
      
      <Modal
        title="Seleccionar fecha de vencimiento"
        open={dateModalVisible}
        onCancel={() => {
          setDateModalVisible(false);
          setSelectedRecord(null);
        }}
        footer={null}
      >
        <DatePicker
          style={{ width: '100%' }}
          format="DD/MM/YY"
          value={selectedRecord?.expirationDate ? dayjs(selectedRecord.expirationDate) : null}
          onChange={handleDateModalOk}
        />
      </Modal>
    </>
  );
};

export default ProductsTable;