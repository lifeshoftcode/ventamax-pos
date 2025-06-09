import styled from 'styled-components'
import { MenuConfig } from './MenuConfig'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

export const MenuComponents = () => {
    const dispatch = useDispatch()
    return (
        <Container>
            <Items>
                {MenuConfig.map((item, index) => {
                    return (
                        <Item key={index}>
                            <Button
                                icon={item.icon}
                                onClick={() => item.onclick(dispatch)}
                            >
                                {item.title}
                            </Button>
                        </Item>
                    )
                })}
            </Items>
        </Container>
    )
}
const Container = styled.div`   
    display: none;
    @media(max-width: 800px) {
        height: 3em;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.541);
        backdrop-filter: blur(10px);
        overflow: hidden;
        display: flex;
        z-index: 1;
        align-items: center;
    }
`
const Items = styled.ul`
     display: flex;
        width: 100%;
        list-style: none;
        justify-content: end;
        margin: 0;
        padding: 0.4em;
`
const Item = styled.li`
    ${props => props.align === 'right' ? 'justify-self: end;' : ''}
`