import React from 'react'
import { toolbarConfig } from './GlobalMenuConfig'
import styled from 'styled-components'

export const GlobalMenu = ({ data, searchData, setSearchData }) => {
    const renderToolbarComponents = (side) => {
        return toolbarConfig[side].map((config) => {
            const MenuComponent = config.component;
            return <MenuComponent key={config.id} side={config.side} data={data} searchData={searchData} setSearchData={setSearchData} />;
        })
    };
    return (
        <Container>
            <LeftSide>{renderToolbarComponents('leftSide')}</LeftSide>
            <RightSide>{renderToolbarComponents('rightSide')}</RightSide>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
`
const LeftSide = styled.div``
const RightSide = styled.div``