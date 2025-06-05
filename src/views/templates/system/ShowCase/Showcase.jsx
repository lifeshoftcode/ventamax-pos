import styled from "styled-components"
import { useFormatNumber } from "../../../../hooks/useFormatNumber";
import { useFormatPrice } from "../../../../hooks/useFormatPrice";

export function Showcase({
    title,
    value,
    valueType = 'none',
    description,
    color = false
}) {
    const determineColor = () => {
        if (typeof color === 'boolean' && color === true) {
            return value >= 0 ? 'success-contained' : 'error-contained';
        }
        if (typeof color === 'string') {
            return color;
        }
        return ""
    }

    const formatValue = () => {
        if (valueType === 'currency') {
            return useFormatPrice(value);
        }
        if (valueType === 'number') {
            return useFormatNumber(value);
        }
        return value;
    }

    return (
        <Container $color={determineColor()}>
            <Title>{title}</Title>
            <Value>{formatValue()}</Value>
            {description && <Description>{description}</Description>}
        </Container>
    )
}

const Container = styled.div`
    padding: 1rem;
    border-radius: 8px;
    background: white;
    border: 1px solid #e0e0e0;
    ${props => props.$color && `
        border-color: var(--color-${props.$color});
        background: var(--color-${props.$color}-bg, white);
    `}
`;

const Title = styled.h3`
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
`;

const Value = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
`;

const Description = styled.p`
    margin: 0;
    font-size: 0.75rem;
    color: #888;
`;