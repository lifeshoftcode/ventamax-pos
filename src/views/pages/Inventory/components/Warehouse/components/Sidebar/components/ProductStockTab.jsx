import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Empty, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faEye } from '@fortawesome/free-solid-svg-icons';
import ProductStockOverview from '../../ProductStockOverview';
import Tree from '../../../../../../../component/tree/Tree';

const TabContent = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ProductStockTab = ({ products, loading, onSearch }) => {
    const navigate = useNavigate();

    const productTreeConfig = {
        actions: [
            {
                name: "Ver Stock",
                icon: faEye,
                type: 'button',
                handler: (node) => {
                    navigate(`/inventory/warehouses/product/${node.key}/stock`);
                },
            }
        ],
        onNodeClick: (node) => {
            navigate(`/inventory/warehouses/product/${node.key}/stock`);
        },
        showMatchedStockCount: false,
        showActions: true,
    };

    const buildTreeData = () => {
        return products.map(product => ({
            title: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{product.name}</span>
                    {product.barcode && (
                        <span style={{ color: '#999', fontSize: '0.85em' }}>
                            #{product.barcode}
                        </span>
                    )}
                </div>
            ),
            key: product.id,
            icon: <FontAwesomeIcon icon={faBoxes} style={{ color: '#2563eb' }} />,
            data: product // Pasar el producto completo como data
        }));
    };

    return (
        <TabContent>
            <Input
                placeholder="Buscar productos..."
                prefix={<SearchOutlined />}
                onChange={(e) => onSearch(e.target.value)}
            />
            <ProductList>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Spin size="large" />
                    </div>
                ) : products.length === 0 ? (
                    <Empty description="No se encontraron productos" />
                ) : (
                    <Tree 
                        data={buildTreeData()} 
                        config={productTreeConfig}
                    />
                )}
            </ProductList>
        </TabContent>
    );
};

export default ProductStockTab;
