import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import BillingConfig from './configs/BillingConfig';
import { Nav } from '../../templates/system/Nav/Nav';
import { MenuApp } from '../../templates/MenuApp/MenuApp';

export default function GeneralConfig() {
  const [activeTab, setActiveTab] = useState('billing');

  const menuItems = [
    {
      key: 'billing',
      icon: <FontAwesomeIcon icon={faCreditCard} />,
      label: 'Ventas y Facturación',
      content: <BillingConfig />,
    },
 
  ];

  return (
    <Nav
      menuItems={menuItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      header={<MenuApp sectionName={'Configuración General'} />}
    >
      {menuItems.find(item => item.key === activeTab)?.content}
    </Nav>
  );
}

