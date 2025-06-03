import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { useFormatPrice } from '../../../../../../hooks/useFormatPrice';
import { Button } from '../../../../../templates/system/Button/Button';

export const ProductCardColumn = ({handleDeleteProduct, handleUpdateProduct, product}) => {
    return (
        <Container>
            <Head>                <Button
                    title="Editar"
                    startIcon={<FontAwesomeIcon icon={faPencil} />}
                    borderRadius='normal'
                    // variant='contained'
                    color={'gray-dark'}
                    bgcolor='editar'
                    onClick={() => handleUpdateProduct(product)}
                />                <Button
                    startIcon={<FontAwesomeIcon icon={faTrash} />}
                    // width='icon32'
                    color={'gray-dark'}
                    borderRadius='normal'
                    // bgcolor='error'
                    onClick={() => handleDeleteProduct(product.id)}
                />
            </Head>
            <Img>
                <img
                    src={product.productImageURL} alt=""
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noImg;
                        currentTarget.style.objectFit = 'contain'
                    }} />
            </Img>
            <Body>
                <ProductName>
                    <h3>{product.productName}</h3>
                </ProductName>
              
                    <Item>
                        <span>costo: {useFormatPrice(product.cost.unit)}</span>
                    </Item>
                    <Item>
                        <span>stock: {product.stock}</span>
                    </Item>
              
                {/* <Item>
                    <span>Contenido Neto: {product.netContent}</span>
                </Item> */}
                <Item>
                    <span>Total: {useFormatPrice(product.price.unit)}</span>
                </Item>
            </Body>

        </Container>
    )
}

const Container = styled.div`
 
 background-color: white;
 border: 1px solid rgba(0, 0, 0, 0.068);
 padding: 0.5em ;
 padding-top: 0.3em;
 border-radius: var(--border-radius1);
 display: grid;
 grid-auto-rows: min-content;
 gap: 0.6em;

   
`
const Head = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: min-content;
`
const Img = styled.div`
    margin-top: -5px;
    width: 100%;
    max-height: 120px;
    min-height: 120px;
    height: 100%;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    display: flex;
    img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`
const Body = styled.div`
`
const ProductName = styled.div`
    color: #1D1D1F;
    h3{
        margin: 0;
        font-size: .9em    
    }
`
const Group = styled.div`
    display: flex;
    justify-content: space-between;
`
const Item = styled.div`
    
`