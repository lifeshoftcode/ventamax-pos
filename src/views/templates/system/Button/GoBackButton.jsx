import styled from 'styled-components'
import { icons } from '../../../../constants/icons/icons'
import { useNavigate } from 'react-router-dom'
import { ButtonIconMenu } from './ButtonIconMenu';
export const GoBackButton = ({onClick = null}) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        if (typeof onClick === 'function') {
            onClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <ButtonIconMenu
            onClick={handleGoBack}
            icon={icons?.arrows?.chevronLeft}
        />
    )
}
