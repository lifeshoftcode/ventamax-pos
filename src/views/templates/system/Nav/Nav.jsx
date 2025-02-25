import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar = styled.div`
  display: none;
  width: ${props => props.collapsed ? '60px' : '250px'};
  background: #fff;
  padding: 0.6em;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: width 0.3s ease;
  position: relative;

  @media (min-width: 769px) {
    display: block;
  }
`;

const CollapseButton = styled.button`
  width: 2.74em;
  height: 36px;
  min-width: 40px;
  background: transparent;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 8px;
  color: #595959;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    background: #f0f0f0;
    color: #1890ff;
  }

  svg {
    font-size: 16px;
    transform: rotate(${props => props.collapsed ? '0deg' : '180deg'});
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
`;

const MenuItem = styled.div`
  padding: 10px 12px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  
  span {
    opacity: ${props => props.collapsed ? 0 : 1};
    transition: opacity 0.2s ease;
    display: ${props => props.collapsed ? 'none' : 'inline'};
  }

  &:hover {
    background: #f0f0f0;
  }
  
  ${props => props.active && `
    background: #e6f7ff;
    color: #1890ff;
  `}

  svg {
    font-size: 16px;
    min-width: 20px;
  }
`;

const MobileSelector = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
  }
`;

const MobileButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
`;

const Backdrop = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 999;
  opacity: ${props => props.isOpen ? '1' : '0'};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  transition: all 0.3s ease;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  border-radius: 0 0 12px 12px;
`;

const MobileMenuContent = styled.div`
  padding: 0.6em;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

`;

const MobileMenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  ${props => props.active && `
    background: #e6f7ff;
    color: #1890ff;
    font-weight: 500;
  `}

  .menu-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  .menu-label {
    font-size: 14px;
  }
`;

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
`;

const MainLayout = styled.div`
  flex: 1;
  gap: 0.4em;
  display: flex;
  width: 100%;
  padding: 0.4em;
  height: calc(100vh - 64px);
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 0.4em;
  }
`;

const PageContainer = styled.div`
  display: flex;
  gap: 0.4em;
  flex: 1;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.4em;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  background: #fff;
  padding: 0.2em 0.4em;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export function Nav({ menuItems, activeTab, onTabChange, header, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleMenuItemClick = (key) => {
    onTabChange(key);
    setIsMenuOpen(false);
  };

  return (
    <AppLayout>
      {header}
      
      <MainLayout>
        <Sidebar collapsed={isCollapsed}>
          <CollapseButton 
            collapsed={isCollapsed}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FontAwesomeIcon 
              icon={isCollapsed ? faAngleRight : faAngleLeft} 
            />
          </CollapseButton>

          {menuItems.map(item => (
            <MenuItem
              key={item.key}
              active={activeTab === item.key}
              onClick={() => onTabChange(item.key)}
              collapsed={isCollapsed}
            >
              {item.icon}
              <span>{item.label}</span>
            </MenuItem>
          ))}
        </Sidebar>
        
        <PageContainer>
          <MobileWrapper>
            {/* Versión móvil */}
            <MobileSelector>
              <MobileButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span>{menuItems.find(item => item.key === activeTab)?.label}</span>
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  style={{ 
                    transform: `rotate(${isMenuOpen ? '90deg' : '0deg'})`,
                    transition: 'transform 0.3s ease'
                  }} 
                />
              </MobileButton>
              <Backdrop isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
              <MobileMenu isOpen={isMenuOpen}>
                <MobileMenuContent>
                  {menuItems.map(item => (
                    <MobileMenuItem
                      key={item.key}
                      active={activeTab === item.key}
                      onClick={() => handleMenuItemClick(item.key)}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                    </MobileMenuItem>
                  ))}
                </MobileMenuContent>
              </MobileMenu>
            </MobileSelector>
          </MobileWrapper>

          <ContentWrapper>
            <Content>
              {children}
            </Content>
          </ContentWrapper>
        </PageContainer>
      </MainLayout>
    </AppLayout>
  );
}
