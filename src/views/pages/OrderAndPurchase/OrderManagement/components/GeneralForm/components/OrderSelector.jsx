import { useMemo, useState, useRef, useEffect } from 'react';
import { Form, Input, Select, Drawer, message, Button, Space, Empty } from 'antd';
import styled from 'styled-components';
import { useFormatPrice } from '../../../../../../../hooks/useFormatPrice';
import { getOrderData, selectPurchase } from '../../../../../../../features/purchase/addPurchaseSlice';
import { useFbGetPendingOrdersByProvider } from '../../../../../../../firebase/order/usefbGetOrders';
import { useSelector, useDispatch } from 'react-redux';
import { normalizeText } from '../../../../../../../utils/text';
import { icons } from '../../../../../../../constants/icons/icons';
import { LoadingOutlined } from '@ant-design/icons';
import DateUtils from '../../../../../../../utils/date/dateUtils';

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: 8px;
`;

const Header = styled.div`
  padding: 0 1em;
  display: flex;
  gap: 8px;
  align-items: center;

  .search-container {
    flex: 1;
  }
`;

const OrdersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: start;
  overflow-y: auto;
  padding: 0 1em;
  align-content: start;
  gap: 12px;

  .empty-container {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    width: 100%;

    .ant-empty {
      .ant-empty-description {
        color: #8c8c8c;
        font-size: 14px;
      }
    }
  }
`;

const OrderCard = styled.div`
  background-color: ${props => props.$isSelected ? '#e6f7ff' : 'white'};
  border: 1px solid ${props => props.$isSelected ? '#1890ff' : '#e8e8e8'};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .order-number {
    font-size: 14px;
    font-weight: 500;
    color: #262626;
  }

  .order-date {
    font-size: 12px;
    color: #8c8c8c;
  }

  .order-total {
    font-size: 14px;
    color: #262626;
    margin-top: 4px;
  }
`;

const OrderSelector = ({ orders, orderLoading }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const searchInputRef = useRef(null);
    const { provider: providerId } = useSelector(selectPurchase);


    useEffect(() => {
        if (visible && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 100);
        }
    }, [visible]);

    const filteredOrders = search
        ? orders.filter((order) =>
            normalizeText(order.numberId.toString()).includes(normalizeText(search)) ||
            normalizeText(DateUtils.convertMillisToISODate(order.dates.createdAt)).includes(normalizeText(search))
        )
        : orders;

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        dispatch(getOrderData(order));
        setVisible(false);
        setSearch('');
        message.success('Pedido seleccionado');
    };

    const handleClear = () => {
        setSelectedOrder(null);
        dispatch(getOrderData(null));
        message.info('Pedido removido');
    };

    return (
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <div style={{ width: '100%', position: 'relative' }}>
                    <Form.Item
                        label="Pedido"
                        rules={[{ required: true, message: 'Por favor selecciona un pedido' }]}
                        help={selectedOrder ? `${DateUtils.convertMillisToISODate(selectedOrder?.dates?.createdAt)} | (${useFormatPrice(selectedOrder.total)}) ` : ''}
                    >
                        <Input
                            value={selectedOrder ? `Pedido #${selectedOrder.numberId}` : ''}
                            placeholder="Buscar y seleccionar pedido..."
                            readOnly
                            disabled={orderLoading}
                            addonAfter={orderLoading ? <LoadingOutlined /> : <span>{orders.length || 0}</span>}
                            onClick={() => setVisible(true)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>
                {selectedOrder && (
                    <Button
                        onClick={handleClear}
                        type="default"
                        icon={icons.operationModes.close}
                    />
                )}
            </Space.Compact>
            <Drawer
                title="Lista de Pedidos"
                placement="bottom"
                onClose={() => setVisible(false)}
                open={visible}
                height={'80%'}
                styles={{
                    body: { padding: '1em' },
                }}
            >
                <Wrapper>
                    <Header>
                        <div className="search-container">
                            <Input
                                ref={searchInputRef}
                                placeholder="Buscar pedidos..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </Header>
                    <OrdersContainer>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    onClick={() => handleOrderSelect(order)}
                                    $isSelected={selectedOrder?.id === order.id}
                                >
                                    <div className="order-number">Pedido #{order.numberId}</div>
                                    <div className="order-date">{DateUtils.convertMillisToISODate(order.dates.createdAt)}</div>
                                    <div className="order-total">Total: {useFormatPrice(order.total)}</div>
                                </OrderCard>
                            ))
                        ) : (
                            <div className="empty-container">
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        search
                                            ? "No se encontraron pedidos con los criterios de búsqueda"
                                            : "No hay pedidos pendientes para este proveedor"
                                    }
                                />
                            </div>
                        )}
                    </OrdersContainer>
                </Wrapper>
            </Drawer>
        </div>
    );
};

export default OrderSelector;
