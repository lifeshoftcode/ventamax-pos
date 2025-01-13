import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { PurchaseTable } from './components/PurchasesTable/PurchasesTable'
import { MenuApp } from '../../../'
import { PurchasesReport } from './components/PurchasesReport/PurchasesReport'
import { FilterBar } from './components/FilterBar/FilterBar'
import createFilterConfig from './config/filterConfig'
import { useFbGetProviders } from '../../../../firebase/provider/useFbGetProvider'
import useFilter from '../../../../hooks/search/useSearch'
import { useListenPurchases } from '../../../../hooks/usePurchases'

export const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState(() => {
    const config = createFilterConfig();
    return {
      filters: config.defaultValues,
      isAscending: config.defaultSort?.isAscending ?? true
    };
  });
  const { providers = [], loading } = useFbGetProviders();

  const dataConfig = useMemo(() => ({
    providerId: {
      data: providers,
      accessor: item => {
        if (!item) return null;
        return {
          value: item.provider.id || '',
          label: item.provider.name || 'Sin nombre'
        }
      }
    }
  }), [providers]);

  const filterConfig = useMemo(() => createFilterConfig(), []);

  const handleFilterChange = useCallback((newFilterState) => {
    setFilterState(newFilterState)
  }, [])

  const { purchases, isLoading } = useListenPurchases(filterState)

  const filteredPurchases = useFilter(purchases, searchTerm)

  return (
    <Container>
      <MenuApp sectionName={'Compras'} />
      <ContentArea>
        <FilterBar
          config={filterConfig}
          onChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          dataConfig={dataConfig}
        />
        <PurchaseTable
          purchases={filteredPurchases}
          loadingPurchases={isLoading}
        />
      </ContentArea>
      <PurchasesReport />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color2);
  display: grid;
  grid-template-rows: min-content 1fr;
`

const ContentArea = styled.div`
  padding: 0.5;
  display: grid;
  grid-template-rows: min-content 1fr;

  overflow: hidden;
  `