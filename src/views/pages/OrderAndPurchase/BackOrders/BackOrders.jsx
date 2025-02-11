import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useEnrichedBackOrders, updateBackOrder } from '../../../../firebase/warehouse/backOrderService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { AnimatePresence } from 'framer-motion';
import { MenuApp } from '../../../templates/MenuApp/MenuApp';
import InventoryMenu from '../../../pages/Inventory/components/Warehouse/components/DetailView/InventoryMenu';
import Header from './components/Header';
import ProductGroup from './components/ProductGroup';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  background: #ffffff;
  overflow-y: auto;
`;

const ProductGroupsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 12px;
`;

const BackOrders = () => {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const { data: backorders, loading } = useEnrichedBackOrders();
  const user = useSelector(selectUser);

  const stats = useMemo(() => ({
    total: backorders.length,
    pending: backorders.filter(b => b.status === 'pending').length,
    reserved: backorders.filter(b => b.status === 'reserved').length,
    completed: backorders.filter(b => b.status === 'completed').length
  }), [backorders]);

  const groupedBackorders = useMemo(() => {
    // Filtrar backorders
    const filtered = backorders.filter(item => {
      const matchesSearch = searchText
        ? item.productName.toLowerCase().includes(searchText.toLowerCase())
        : true;
      const matchesDate = dateRange
        ? new Date(item.createdAt) >= dateRange[0].startOf('day') &&
        new Date(item.createdAt) <= dateRange[1].endOf('day')
        : true;
      return matchesSearch && matchesDate;
    });

    // Agrupar por producto y luego por fecha
    const groups = filtered.reduce((acc, item) => {
      const key = item.productId;
      const dateKey = new Date(item.createdAt).toLocaleDateString();
      
      if (!acc[key]) {
        acc[key] = {
          productId: key,
          productName: item.productName,
          totalQuantity: 0,
          pendingQuantity: 0,
          lastUpdate: item.updatedAt,
          progress: 0,
          dateGroups: {}
        };
      }

      if (!acc[key].dateGroups[dateKey]) {
        acc[key].dateGroups[dateKey] = {
          date: new Date(item.createdAt),
          items: [],
          totalQuantity: 0,
          pendingQuantity: 0
        };
      }

      acc[key].dateGroups[dateKey].items.push(item);
      acc[key].dateGroups[dateKey].totalQuantity += item.initialQuantity || 0;
      acc[key].dateGroups[dateKey].pendingQuantity += item.pendingQuantity || 0;
      
      acc[key].totalQuantity += item.initialQuantity || 0;
      acc[key].pendingQuantity += item.pendingQuantity || 0;
      acc[key].lastUpdate = new Date(Math.max(new Date(acc[key].lastUpdate), new Date(item.updatedAt)));
      acc[key].progress = Math.round(((acc[key].totalQuantity - acc[key].pendingQuantity) / acc[key].totalQuantity) * 100);
      return acc;
    }, {});

    // Ordenar grupos según el criterio seleccionado
    return Object.values(groups).sort((a, b) => {
      switch (sortBy) {
        case 'pending-desc':
          return b.pendingQuantity - a.pendingQuantity;
        case 'pending-asc':
          return a.pendingQuantity - b.pendingQuantity;
        case 'date-desc':
          return b.lastUpdate - a.lastUpdate;
        case 'date-asc':
          return a.lastUpdate - b.lastUpdate;
        case 'progress-desc':
          return b.progress - a.progress;
        case 'progress-asc':
          return a.progress - b.progress;
        default:
          return 0;
      }
    });
  }, [backorders, searchText, dateRange, sortBy]);

  const toggleGroup = (productId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <Container>
      <MenuApp
        data={[]}
        sectionName="BackOrders"
        sectionNameIcon="📦"
        displayName="Back Orders"
        onBackClick={() => {}}
      />
      <InventoryMenu />
      <Content>
        <Header 
          stats={stats}
          searchText={searchText}
          setSearchText={setSearchText}
          dateRange={dateRange}
          setDateRange={setDateRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <AnimatePresence>
          <ProductGroupsContainer>
            {groupedBackorders.map((group) => (
              <ProductGroup
                key={group.productId}
                group={group}
                isCollapsed={collapsedGroups[group.productId]}
                onToggle={() => toggleGroup(group.productId)}
              />
            ))}
          </ProductGroupsContainer>
        </AnimatePresence>
      </Content>
    </Container>
  );
};

export default BackOrders;