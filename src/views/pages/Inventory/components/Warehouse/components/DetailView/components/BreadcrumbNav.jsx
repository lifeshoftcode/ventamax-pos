import React from 'react';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { useDispatch } from 'react-redux';
import { navigateToBreadcrumb } from '../../../../../../../../features/warehouse/warehouseSlice';

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: 16px;
`;

const BreadcrumbLink = styled.span`
  cursor: pointer;
  color: #1890ff;
`;

export const BreadcrumbNav = ({ breadcrumbs }) => {
  const dispatch = useDispatch();

  return breadcrumbs.length > 0 ? (
    <StyledBreadcrumb>
      {breadcrumbs.map((item, index) => (
        <Breadcrumb.Item key={index}>
          <BreadcrumbLink onClick={() => dispatch(navigateToBreadcrumb(index))}>
            {item.title}
          </BreadcrumbLink>
        </Breadcrumb.Item>
      ))}
    </StyledBreadcrumb>
  ) : null;
};
