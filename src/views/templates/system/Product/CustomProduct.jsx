import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { handleModalSetCustomPizza } from '../../../../features/modals/modalSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

export const CustomProduct = ({ product }) => {
    const dispatch = useDispatch();
    const imageHiddenRef = false;
    const handleGetThisProduct = () => {
        dispatch(handleModalSetCustomPizza())
    };
    return (
        <ProductContainer  onClick={() => handleGetThisProduct(product)} imageHiddenRef={imageHiddenRef ? true : false}>
            <ProductImgWrapper imageHiddenRef={imageHiddenRef ? true : false}>
                <div>
                    {<FontAwesomeIcon icon={faPizzaSlice} />}
                </div>
            </ProductImgWrapper>
            <Body>
                <Main>
                    <Title>{product.name}</Title>
                </Main>
            </Body>
        </ProductContainer>
    )
}
const ProductContainer = styled.div`
  
    border-radius: 6px;
    border: 4px solid rgb(250, 234, 89);
    background-color: rgb(250, 234, 89);
    overflow: hidden;
    display: grid;
    gap: 10px;
    grid-template-columns: min-content 1fr;
    transition: 400ms all ease-in-out;
   
    ${(props) => {
        switch (props.imageHiddenRef) {
            case true:
                return `
                    height: 60px;
                `

            case false:
                return `
                    height: 80px;
                `

            default:
                break;
        }
    }
    }
   
${(props) => {
        switch (props.container) {
            case "row":
                return `
                grid-template-columns: min-content 1fr;
                height: 80px;
                overflow: hidden;
                `;
            default:
                return `
          `
        }
    }}
`;
const ProductImgWrapper = styled.div`
    overflow: hidden;
    display: flex;
    height: 100%;
    width: 80px;
    border-radius: 6px;
   // background-color: green;
    padding: 4px;
    transition: all 400ms ease-in-out;
    ${(props) => {
        switch (props.imageHiddenRef) {
            case false:
                return`
                
                
                div{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 6px;
                    height: 100%;
                    width: 100%;
                    background-color: #f3f3f3b2;
                    svg{
                        font-size: 2em;
                        color: #000000b2;

                    }
                }
                
                `
                case true:
                    return`
                    height: 60px;
                    display:flex;
                     justify-content: center;
                    align-items: center;
                    svg{
                        width: 60px;
                        font-size: 2em;
                    }
                    
                `
            default:
                break;
        }  
    }}
    span{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        font-weight: 700;
        height: 100%;
        color: rgba(0, 0, 0, 0.200);
        background-color: var(--White3);
        border-radius: 7px;
    }
;
    ${(props) => {
        switch (props.type) {
            case "row":
                return `
                height: 100px;
                width: 100px;
                `;
            case "normal":
                return `
                `;
            default:
                return `
          `
        }
    }}
    
`;
const Body = styled.div`
     height: 100%;
    width: 100%;
    padding: 4px 0;
    position: relative;
    transition: 4000ms all ease-in-out;
    `
const Main = styled.div`
   
`
const Title = styled.div`
    color: var(--Gray6);
    width: 100%;
    font-size: 13.5px;
    line-height: 1pc;
    padding: 0 1em;
    padding-top: 0.4em;
    padding-right: 2em;
    display: -webkit-box;
    font-weight: 600;
    letter-spacing: 0.2px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    //white-space: nowrap;
    text-transform: capitalize;
    text-overflow: ellipsis;
    overflow: hidden;
`