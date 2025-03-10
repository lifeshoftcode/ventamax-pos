import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Alert, Space, Tag } from 'antd';
import styled from 'styled-components';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../../../../firebase/firebaseconfig';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Container = styled.div`
  padding: 20px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #f5f5f5;
    font-weight: 600;
  }
`;

interface ProductPricing {
    avgPrice: number;
    cost: number;
    listPrice: number;
    minPrice: number;
    price: number;
    tax: string;
}

interface Product {
    id: string;
    name: string;
    barcode: string;
    category: string;
    stock: number;
    pricing: ProductPricing;
    status: string;
    updatedAt: string;
    type: string;
    isVisible: boolean;
}

export const DuplicateProducts: React.FC = () => {
    const [duplicates, setDuplicates] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const user = useSelector(selectUser);
    const businessID = user?.businessID;

    useEffect(() => {
        if (businessID) {
            loadDuplicateProducts();
        }
    }, [businessID]);

    const loadDuplicateProducts = async () => {
        try {
            const productsRef = collection(db, 'businesses', businessID, 'products');
            const querySnapshot = await getDocs(productsRef);

            const products: Product[] = [];
            querySnapshot.forEach((doc) => {
                products.push(doc.data() as Product);
            });

            // Agrupar productos por nombre para encontrar duplicados
            const duplicateProducts = products.reduce((acc, product) => {
                const key = product.name.toLowerCase().trim();
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(product);
                return acc;
            }, {} as Record<string, Product[]>);

            // Filtrar solo los productos que tienen duplicados
            const duplicatesList = Object.values(duplicateProducts)
                .filter(group => group.length > 1)
                .flat();

            setDuplicates(duplicatesList);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar productos duplicados');
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Product, b: Product) => a.name.localeCompare(b.name)
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a: Product, b: Product) => a.stock - b.stock
        },
        {
            title: 'Precio',
            key: 'price',
            render: (_, record: Product) => `$${record.pricing.price}`
        },
        {
            title: 'Estado',
            key: 'status',
            render: (_, record: Product) => (
                <Tag color={record.isVisible ? 'green' : 'red'}>
                    {record.isVisible ? 'Activo' : 'Inactivo'}
                </Tag>
            )
        },
        {
            title: 'Última Actualización',
            dataIndex: 'updatedAt',
            key: 'updatedAt'
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record: Product) => (
                <Button type="primary" onClick={() => handleMergeProducts(record.id)}>
                    Fusionar
                </Button>
            ),
        },
    ];

    const handleMergeProducts = async (productId: string) => {
        try {
            console.log(`Fusionando producto ${productId}`);
            await loadDuplicateProducts();
        } catch (err) {
            setError('Error al fusionar productos');
        }
    };

    if (error) return <Alert message={error} type="error" />;

    return (
        <Container>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5}>Productos con Nombres Duplicados</Title>
                <StyledTable
                    columns={columns}
                    dataSource={duplicates}
                    loading={loading}
                    rowKey="id"
                    size="middle"
                />
            </Space>
        </Container>
    );
};
