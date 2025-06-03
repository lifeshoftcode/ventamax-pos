import { useState } from "react"
import { useDispatch } from "react-redux"
import { addItem, deleteItem } from "../../../features/category/categorySlicer"
import styled from "styled-components"
import { motion } from "framer-motion"
import getIconFromText from "../../../utils/text/getIconFromText"

export const Category = ({ category, ref, onClick, type, icon, themeColor, selected, index }) => {
    const [isSelected, setIsSelected] = useState(false)
    const dispatch = useDispatch();
    const start = (category, ref) => {
        if (isSelected === false) {
            setIsSelected(!isSelected)
            dispatch(addItem(category))
        }
        if (isSelected) {
            setIsSelected(!isSelected)
            dispatch(deleteItem(category))
        }
        requestAnimationFrame(() => {
            if (ref.current) {
                ref.current.scrollTo(0, 0)
            }
        })
    }
    const effectCategory = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    return (
        <Container
            themeColor={themeColor}
            type={type}
            selected={selected ? true : false}
            onClick={(e) => onClick ? onClick() : start(category, ref)}
            // variants={effectCategory}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: index * 0.4 }}
        >
            {icon && icon}
            {getIconFromText(category.name)}
            {category.name}
        </Container>
    )
}

const Container = styled(motion.li)`
//font & text
font-size: 14px;
letter-spacing: 0.2px;
white-space: nowrap;
//box
height: 2.2em;
display: flex;
align-items: center;
padding: 0 0.75em;
gap: 0.5em;
//color & Ground
background-color: ${({ theme }) => theme.bg.color2};
    border-radius: var(--border-radius);
    text-transform: capitalize;
    font-weight: 500;
    color: #585858;
    transition: 300ms ease-in-out;
    :hover{

        background-color: #e7f0fa;
        color: rgb(83, 83, 83);
    }
   
    ${props => {
        switch (props.type) {
            case 'create':
                return `
                    background-color: var(--color-success-light);
                    color: var(--color-success-dark);
                    ${!props.selected && (
                        `
                        :hover{
                        background-color: var(--color-success-light);
                        color: var(--color-success-dark);
                    }`
                    )

                    }
                    
                    `
            default:
                break;
        }
    }}
 
     ${props => {
        switch (props.selected) {
            case true:
                return `
                    background-color: ${props.theme.bg.color4};
                    color: white;
                    :hover{
                        background-color: ${props.theme.bg.color4};
                        color: white;
                    }
                   
                `

            default:
                break;
        }
    }}
`