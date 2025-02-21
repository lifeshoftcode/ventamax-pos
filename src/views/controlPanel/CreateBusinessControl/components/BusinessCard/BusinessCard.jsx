import styled from "styled-components"
import { FormattedValue } from "../../../../templates/system/FormattedValue/FormattedValue"
import { BusinessEditModal } from "../../../BusinessEditModal/BusinessEditModal"
import { useMemo, useState } from "react"
import { EditOutlined, EnvironmentOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons'
import { truncateString } from "../../../../../utils/text/truncateString"

export const BusinessCard = ({ business }) => {
    const [businessEditModalOpen, setBusinessEditModalOpen] = useState(false)

    const openModal = (e) => {
        e.stopPropagation();
        setBusinessEditModalOpen(true);
    }
    const closeModal = () => setBusinessEditModalOpen(false);

    const truncatedValues = useMemo(() => ({
        address: truncateString(business.address, 20),
        tel: truncateString(business.tel, 20),
        name: truncateString(business.name, 20),
        id: truncateString(business.id, 20),
      }), [business]);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Evita comportamientos no deseados
            openModal(e);
          }
      };

    return (
        <StyledCard onClick={openModal} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
            <Head>
                <BusinessName>
                    <FormattedValue type={'subtitle'} value={truncatedValues.name} />
                </BusinessName>
                <EditIcon><EditOutlined /></EditIcon>
            </Head>
            <Body>
                <InfoItem>
                    <IdcardOutlined /> <span>{truncatedValues.id}</span>
                </InfoItem>
                <InfoItem>
                    <EnvironmentOutlined /> <span>{truncatedValues.address}</span>
                </InfoItem>
                <InfoItem>
                    <PhoneOutlined /> <span>{truncatedValues.tel}</span>
                </InfoItem>
            </Body>
            <BusinessEditModal
                isOpen={businessEditModalOpen}
                onClose={closeModal}
                business={business} 
            />
        </StyledCard>
    )
}

const StyledCard = styled.div`
    padding: 0.75rem;
    border: 1px solid var(--color-border, #e8e8e8);
    border-radius: 6px;
    background-color: #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
`

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border, #f0f0f0);
`

const BusinessName = styled.div`
    color: var(--color-text-primary, #262626);
    font-size: 1rem;
    font-weight: 600;
    margin-right: 0.5rem;
`

const EditIcon = styled.span`
    color: var(--color-primary, #1890ff);
    opacity: 0.7;
    transition: opacity 0.2s ease;
    padding: 4px;

    &:hover {
        opacity: 1;
    }
`

const Body = styled.div`
    display: grid;

    gap: 0.5rem;
`

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: var(--color-text-secondary, #595959);
    font-size: 0.85rem;
    min-width: 0;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    svg {
        flex-shrink: 0;
        font-size: 0.9rem;
        color: var(--color-text-secondary, #8c8c8c);
    }
`
