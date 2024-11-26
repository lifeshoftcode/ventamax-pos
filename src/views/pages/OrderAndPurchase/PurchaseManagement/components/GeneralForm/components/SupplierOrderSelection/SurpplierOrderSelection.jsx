import React from 'react';
import { Form, Select } from 'antd';
import ProviderSelector from '../ProviderSelector';
import OrderSelector from '../OrderSelector';

const { Option } = Select;

const SupplierOrderSelection = ({ supplierName, orderSelection, onChange }) => (
  <div>
    <ProviderSelector />
    <OrderSelector />
  </div>
);

export default SupplierOrderSelection;
