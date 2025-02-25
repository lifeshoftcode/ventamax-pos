import React from 'react';
import styled from 'styled-components';

export const WarrantySignature = ({data}) => {
  const someProductHaveWarranty = data?.products?.some((product) => product?.warranty?.status)
  if (someProductHaveWarranty) {
    return (
      <SignatureContainer>
        <div>
          <Line />
          <Text>Despachado por</Text>
        </div>
        <div>
          <Line />
          <Text>Recibido por</Text>
        </div>
      </SignatureContainer>
    );
  }
};



const SignatureContainer = styled.div`
  display: grid;
  gap: 2em;
  padding: 0 0.4em;
  margin-top: 2.5em;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 0 10px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
`;