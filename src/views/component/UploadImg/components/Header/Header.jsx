import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../../../templates/system/Button/Button'

export const Header = ({setIsOpen}) => {
    return (
        <Head>            <Button
                borderRadius='normal'
                startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                title='atrás'
                onClick={() => setIsOpen(false)}
            />
        </Head>
    )
}

const Head = styled.div`
    height: 2.75em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`