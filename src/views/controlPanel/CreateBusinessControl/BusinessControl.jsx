import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fbGetBusinesses } from '../../../firebase/dev/businesses/fbGetBusinesses'
import { MenuApp } from '../../templates/MenuApp/MenuApp'
import { BusinessCard } from './components/BusinessCard/BusinessCard'
import { Input } from 'antd'

export const BusinessControl = () => {
  const [businesses, setBusinesses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 12

  useEffect(() => {
    fbGetBusinesses(setBusinesses)
  }, [])

  const filteredBusinesses = businesses.filter((obj) =>
    obj.business.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastBusiness = currentPage * itemsPerPage
  const indexOfFirstBusiness = indexOfLastBusiness - itemsPerPage
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness)
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage)

  const goToPrevPage = () => {
    if(currentPage > 1) setCurrentPage(currentPage - 1)
  }
  const goToNextPage = () => {
    if(currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <Container>
      <Head>
        <MenuApp sectionName={"Gestionar Negocios"} />
        <SearchContainer>
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Head>
      <Body>
        {currentBusinesses.map(({ business }, idx) => (
          <BusinessCard key={idx} business={business} />
        ))}
      </Body>
      <Pagination>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </Pagination>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  height: 100vh;
  overflow: hidden;
`
const Head = styled.div``

const SearchContainer = styled.div`
  padding: 10px;
  width: 300px;
`

const Body = styled.div`
  display: grid;
  padding: 10px;
  gap: 10px;
  background-color: var(--color2);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-content: start;
  overflow: auto;
`
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  button {
    padding: 8px 15px;
    background-color: var(--color1);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  span {
    font-weight: bold;
    margin: 0 10px;
  }
`