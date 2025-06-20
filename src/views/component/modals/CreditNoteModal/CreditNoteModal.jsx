import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Select, Checkbox, Typography, Alert, Divider, message, Table, Input, Collapse, Tag } from 'antd';
import styled from 'styled-components';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { closeCreditNoteModal, selectCreditNoteModal, openCreditNoteModal } from '../../../../features/creditNote/creditNoteModalSlice';
import { selectUser } from '../../../../features/auth/userSlice';
import { useFbGetClientsOnOpen } from '../../../../firebase/client/useFbGetClientsOnOpen';
import { useFbGetInvoicesByClient } from '../../../../firebase/invoices/useFbGetInvoicesByClient';
import { useFormatPrice } from '../../../../hooks/useFormatPrice';
import { fbAddCreditNote } from '../../../../firebase/creditNotes/fbAddCreditNote';
import { getTotalPrice } from '../../../../utils/pricing';
import { fbUpdateCreditNote } from '../../../../firebase/creditNotes/fbUpdateCreditNote';
import { useFbGetCreditNotesByInvoice } from '../../../../firebase/creditNotes/useFbGetCreditNotesByInvoice';

const { Option } = Select;
const { Title, Text } = Typography;
const { Panel } = Collapse;

export const CreditNoteModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedInvoice, selectedClient, mode, creditNoteData } = useSelector(selectCreditNoteModal);
  const user = useSelector(selectUser);
  const { clients: fetchedClients, loading: clientsLoading } = useFbGetClientsOnOpen({ isOpen });

  const clients = fetchedClients.map(c => c.client);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(selectedClient?.id || null);
  const { invoices, loading: invoicesLoading } = useFbGetInvoicesByClient(selectedClientId);

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(selectedInvoice?.id || null);
  const { creditNotes: invoiceCreditNotes } = useFbGetCreditNotesByInvoice(selectedInvoiceId);

  const otherCreditNotes = useMemo(() =>
    invoiceCreditNotes.filter(cn => cn.id !== creditNoteData?.id),
    [invoiceCreditNotes, creditNoteData]
  );

  const creditedItemIds = useMemo(() =>
    otherCreditNotes.flatMap(cn => (cn.items || []).map(it => it.id)),
    [otherCreditNotes]
  );

  const currentInvoice = invoices.find(inv => inv.id === selectedInvoiceId);

  const availableInvoiceItems = useMemo(() => {
    if (!currentInvoice || !Array.isArray(currentInvoice.products)) return [];
    return currentInvoice.products.filter(item => !creditedItemIds.includes(item.id));
  }, [currentInvoice, creditedItemIds]);
  const currentClient = clients.find(client => client.id === selectedClientId);
  const relatedCreditNotes = invoiceCreditNotes.filter(
    cn => cn.invoiceId === selectedInvoiceId && cn.id !== creditNoteData?.id
  );

  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const ALLOWED_EDIT_MS = 2 * 24 * 60 * 60 * 1000; // 2 días
  const createdAtDate = creditNoteData?.createdAt ? (creditNoteData.createdAt.seconds ? new Date(creditNoteData.createdAt.seconds * 1000) : new Date(creditNoteData.createdAt)) : null;
  const isEditAllowed = mode === 'edit' && createdAtDate ? (Date.now() - createdAtDate.getTime() <= ALLOWED_EDIT_MS) : mode === 'edit';
  const effectiveIsView = mode === 'view' || (mode === 'edit' && !isEditAllowed);
  const effectiveIsEdit = mode === 'edit' && isEditAllowed;

  const hasAvailableProducts = availableInvoiceItems.length > 0;

  useEffect(() => {
    if (!isOpen) return;
    if (mode !== 'create' && creditNoteData) {
      setSelectedClientId(creditNoteData.client?.id || null);
      setSelectedInvoiceId(creditNoteData.invoiceId || null);
      setSelectedItems(creditNoteData.items?.map(i => i.id) || []);
      setSelectAll(false); // we will rely on checkboxes
    } else {
      // reset already handled by handleClose, but guard just in case
      setSelectedClientId(null);
      setSelectedInvoiceId(null);
      setSelectedItems([]);
      setSelectAll(false);
    }
  }, [isOpen, mode, creditNoteData]);

  // Effect to reset/initialize when invoice changes
  useEffect(() => {
    if (!selectedInvoiceId) {
      setSelectedItems([]);
      setSelectAll(false);
      setFilteredProducts([]);
      return;
    }

    // This logic runs when the invoice is first selected, or when available items for it change fundamentally.
    // It defaults to selecting all available items.
    const initialSelection = availableInvoiceItems.map(item => item.id);
    setSelectedItems(initialSelection);
    setSelectAll(initialSelection.length > 0 && initialSelection.length === availableInvoiceItems.length);
    setFilteredProducts(availableInvoiceItems);
    setSearchText('');
    setCurrentPage(1);

  }, [selectedInvoiceId, creditedItemIds]);

  useEffect(() => {
    const baseList = availableInvoiceItems;

    if (!searchText.trim()) {
      setFilteredProducts(baseList);
      return;
    }

    const searchLower = searchText.toLowerCase().trim();
    const filtered = baseList.filter(item =>
      item.name?.toLowerCase().includes(searchLower)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchText, availableInvoiceItems]);

  const handleClose = () => {
    dispatch(closeCreditNoteModal());
    setSelectedItems([]);
    setSelectAll(false);
    setSelectedClientId(null);
    setSelectedInvoiceId(null);
  };

  const handleClientChange = (clientId) => {
    setSelectedClientId(clientId);
    setSelectedItems([]);
    setSelectAll(false);
    setSelectedInvoiceId(null);
  };

  const handleInvoiceChange = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedItems(checked ? filteredProducts.filter(it => !creditedItemIds.includes(it.id)).map(item => item.id) : []);
  };

  const handleItemChange = (itemId, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
      setSelectAll(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const selectedProducts = availableInvoiceItems.filter(item => selectedItems.includes(item.id));
      
      const payload = {
        client: currentClient,
        invoiceId: selectedInvoiceId,
        items: selectedProducts,
        totalAmount,
      };

      if (effectiveIsEdit) {
        await fbUpdateCreditNote(user, creditNoteData.id, payload);
        message.success('Nota de crédito actualizada exitosamente');
      } else {
        await fbAddCreditNote(user, payload);
      message.success('Nota de crédito creada exitosamente');
      }
      handleClose();
    } catch (error) {
      console.error('Error al procesar la nota de crédito:', error);
      message.error('Ocurrió un error al guardar la nota de crédito');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = availableInvoiceItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + getTotalPrice(item), 0);

  const columns = [
    {
      title: '',
      dataIndex: 'select',
      width: '50px',
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.includes(record.id)}
          disabled={effectiveIsView || creditedItemIds.includes(record.id)}
          onChange={(e) => handleItemChange(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: 'Producto',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Cantidad',
      dataIndex: 'amountToBuy',
      key: 'quantity',
      width: '80px',
      render: (amountToBuy) => amountToBuy || 1,
    },
    {
      title: 'Precio',
      dataIndex: 'pricing',
      key: 'price',
      width: '120px',
      align: 'right',
      render: (_, record) => {
        const unitPrice = getTotalPrice(record, true, false);
        return useFormatPrice(unitPrice);
      },
      sorter: (a, b) => getTotalPrice(a, true, false) - getTotalPrice(b, true, false),
    },
    {
      title: 'ITBIS',
      dataIndex: 'itbis',
      key: 'itbis',
      width: '120px',
      align: 'right',
      render: (_, record) => {
        const total = getTotalPrice(record);
        const itbis = total - (total / 1.18);
        return useFormatPrice(itbis);
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: '120px',
      align: 'right',
      render: (_, record) => useFormatPrice(getTotalPrice(record)),
      sorter: (a, b) => getTotalPrice(a) - getTotalPrice(b),
    },
  ];

  const handleNavigateNote = (note, e) => {
    if (e) e.stopPropagation();
    if (!note) return;
    dispatch(openCreditNoteModal({ mode, creditNoteData: note }));
  };

  return (
    <Modal
      title={<TitleRow>{effectiveIsView ? 'Detalle Nota de Crédito' : effectiveIsEdit ? 'Editar Nota de Crédito' : 'Crear Nueva Nota de Crédito'}</TitleRow>}
      open={isOpen}
      onCancel={handleClose}
      width={700}
      style={{top: '10px'}}
      footer={null}
    >
      <Container>
        {(effectiveIsView || effectiveIsEdit) && creditNoteData && (
          <CurrentNCNumber>
            Nota de Crédito: {creditNoteData.number || creditNoteData.numberID || creditNoteData.id}
          </CurrentNCNumber>
        )}
        {mode === 'create' && (
          <Description>Complete los detalles para generar una nueva nota de crédito.</Description>
        )}

        <FormSection>
          <FormRow>
            <FormField>
              <FieldLabel>Cliente</FieldLabel>
              <Select
                placeholder="Seleccionar cliente"
                value={selectedClientId}
                onChange={handleClientChange}
                disabled={effectiveIsView}
                style={{ width: '100%' }}
                loading={clientsLoading}
              >
                {clients.map(client => (
                  <Option key={client.id} value={client.id}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </FormField>

            <FormField>
              <FieldLabel>Facturas</FieldLabel>
              <Select
                placeholder="Seleccionar factura"
                value={selectedInvoiceId}
                onChange={handleInvoiceChange}
                disabled={!selectedClientId || effectiveIsView}
                style={{ width: '100%' }}
                loading={invoicesLoading}
              >
                {invoices.map(invoice => (
                  <Option key={invoice.id} value={invoice.id}>
                   #{invoice.numberID} - {invoice.products?.length || 0} items - {useFormatPrice(invoice.totalPurchase.value)}
                  </Option>
                ))}
              </Select>
            </FormField>
          </FormRow>
        </FormSection>

        {relatedCreditNotes.length > 0 && (
          <RelatedNCSection>
            <Collapse size="small">
                    {relatedCreditNotes.map(cn => (
                <Panel 
                  header={`NC ${cn.number || cn.numberID || cn.id}`}
                  key={cn.id}
                  extra={
                    <Button type="link" icon={<EyeOutlined />} onClick={(e)=>handleNavigateNote(cn, e)} />
                  }
                >
                  {(cn.items || []).map(item => (
                    <RelatedItemRow key={item.id}>
                      <span>
                        {item.name} <Tag>x{item.amountToBuy || 1}</Tag>
                      </span>
                      <span>{useFormatPrice(getTotalPrice(item))}</span>
                    </RelatedItemRow>
                    ))}
                </Panel>
              ))}
            </Collapse>
          </RelatedNCSection>
        )}

        {currentInvoice && hasAvailableProducts && (
          <ProductsSection>
            <SectionHeader>
              <div>
                <SectionTitle>Productos a Acreditar</SectionTitle>
                <SelectAllContainer>
                  <Checkbox
                    checked={selectAll}
                    disabled={effectiveIsView}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  >
                    Seleccionar todos los productos
                  </Checkbox>
                </SelectAllContainer>
              </div>
              <SearchContainer>
                <Input
                  placeholder="Buscar producto..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 200 }}
                  disabled={effectiveIsView}
                />
              </SearchContainer>
            </SectionHeader>

            <Table
              dataSource={filteredProducts}
              columns={columns}
              rowKey="id"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredProducts.length,
                onChange: (page) => setCurrentPage(page),
                showSizeChanger: false,
              }}
              size="small"
            />

            {selectedItems.length > 0 && (
              <>
                <TotalSection>
                  <TotalInfo>
                    <InfoRow>
                      <InfoLabel>Items Seleccionados:</InfoLabel>
                      <InfoValue>{selectedItems.length} productos</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Subtotal:</InfoLabel>
                      <InfoValue>{useFormatPrice(totalAmount / 1.18)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>ITBIS (18%):</InfoLabel>
                      <InfoValue>{useFormatPrice(totalAmount - (totalAmount / 1.18))}</InfoValue>
                    </InfoRow>
                    <InfoRow className="total">
                      <InfoLabel>Total a Acreditar:</InfoLabel>
                      <InfoValue>{useFormatPrice(totalAmount)}</InfoValue>
                    </InfoRow>
                  </TotalInfo>
                </TotalSection>
              </>
            )}
          </ProductsSection>
        )}

        {currentInvoice && !hasAvailableProducts && (
          <NoProductsMessage>
            <Alert
              type="info"
              showIcon
              message="Sin productos disponibles"
              description="Todos los productos de esta factura ya han sido acreditados en otras notas de crédito." />
          </NoProductsMessage>
        )}

        <ActionButtons>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          {!effectiveIsView && (
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!selectedInvoiceId || selectedItems.length === 0}
            loading={loading}
          >
              {effectiveIsEdit ? 'Guardar Cambios' : 'Crear Nota de Crédito'}
          </Button>
          )}
        </ActionButtons>
        {effectiveIsEdit && (
          <CountdownText>
            {isEditAllowed ? `Tiempo restante para editar: ${Math.max(0, Math.floor((ALLOWED_EDIT_MS - (Date.now() - createdAtDate.getTime()))/ (60*60*1000)))}h` : 'Edición expirada'}
          </CountdownText>
        )}
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme?.text?.secondary || '#666'};
  margin: 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme?.text?.primary || '#333'};
`;

const AlertSection = styled.div``;

const CreditNoteList = styled.ul`
  margin: 0.5rem 0 0 0;
  padding-left: 1rem;
`;

const CreditNoteItem = styled.li`
  margin: 0.25rem 0;
`;

const ProductsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme?.text?.primary || '#333'};
`;

const SelectAllContainer = styled.div`
  margin-top: 0.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0;
  width: 100%;
`;

const TotalInfo = styled.div`
  min-width: 300px;
  border: 1px solid ${props => props.theme?.border?.color || '#d9d9d9'};
  border-radius: 8px;
  padding: 1rem;
  background-color: ${props => props.theme?.background?.secondary || '#fafafa'};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  
  &.total {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${props => props.theme?.border?.color || '#d9d9d9'};
  font-weight: 600;
    font-size: 1.1rem;
  }
`;

const InfoLabel = styled.span`
  color: ${props => props.theme?.text?.secondary || '#666'};
`;

const InfoValue = styled.span`
  color: ${props => props.theme?.text?.primary || '#333'};
  font-family: monospace;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme?.border?.color || '#d9d9d9'};
`;

const CountdownText = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: ${props => props.theme?.text?.secondary || '#888'};
  margin-top: -0.5rem;
`;

const RelatedNCSection = styled.div`
  margin-top: 8px;
`;

const RelatedItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  font-size: 0.85rem;
`;

const NoProductsMessage = styled.div`
  margin-top: 1rem;
`;

const TitleRow = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const CurrentNCNumber = styled.p`
  font-weight: 600;
  margin: 0;
`;
