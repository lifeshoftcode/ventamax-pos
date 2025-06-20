import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Table, Button, Space, Tooltip } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { openCreditNoteModal } from '../../../../features/creditNote/creditNoteModalSlice';
import { MenuApp } from '../../../templates/MenuApp/MenuApp';
import { useFbGetCreditNotes } from '../../../../firebase/creditNotes/useFbGetCreditNotes';
import { useFormatPrice } from '../../../../hooks/useFormatPrice';

export const CreditNoteList = () => {
    const dispatch = useDispatch();

    const { creditNotes, loading } = useFbGetCreditNotes();

    const ALLOWED_EDIT_MS = 2 * 24 * 60 * 60 * 1000; // 2 días

    const canEditRecord = (record) => {
        const created = record.createdAt?.seconds ? new Date(record.createdAt.seconds * 1000) : new Date(record.createdAt);
        return Date.now() - created.getTime() <= ALLOWED_EDIT_MS;
    };

    const columns = [
        {
            title: 'Número',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Cliente',
            dataIndex: ['client', 'name'],
            key: 'client',
            render: (_, record) => record.client?.name || '-'
        },
        {
            title: 'Monto',
            dataIndex: 'totalAmount',
            key: 'amount',
            align: 'right',
            render: (value) => useFormatPrice(value || 0),
            sorter: (a, b) => (a.totalAmount || 0) - (b.totalAmount || 0),
        },
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            key: 'date',
            render: (value) => {
                if (!value) return '-';
                const date = value.seconds ? new Date(value.seconds * 1000) : new Date(value);
                return date.toLocaleDateString();
            },
            sorter: (a, b) => {
                const getMillis = (ts) => (ts?.seconds ? ts.seconds * 1000 : ts ? new Date(ts).getTime() : 0);
                return getMillis(a.createdAt) - getMillis(b.createdAt);
            },
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (value) => value || 'Emitida'
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Ver">
                        <Button
                            type="link"
                            icon={<EyeOutlined />}
                            onClick={() => handleView(record)}
                        />
                    </Tooltip>
                    {canEditRecord(record) ? (
                        <Tooltip title="Editar">
                            <Button
                                type="link"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(record)}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Edición deshabilitada (fuera de plazo)">
                            <Button type="link" icon={<LockOutlined />} disabled />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    const handleCreateNew = () => {
        dispatch(openCreditNoteModal({ mode: 'create' }));
    };

    const handleView = (record) => {
        dispatch(openCreditNoteModal({
            mode: 'view',
            creditNoteData: record
        }));
    };

    const handleEdit = (record) => {
        dispatch(openCreditNoteModal({
            mode: 'edit',
            creditNoteData: record
        }));
    };

    return (
        <Container>
            <MenuApp />
            <Card
                title="Notas de Crédito"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreateNew}
                    >
                        Nota de Crédito
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={creditNotes}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Card>
        </Container>
    );
};

const Container = styled.div`

`;
