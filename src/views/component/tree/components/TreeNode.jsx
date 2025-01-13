import React from "react";
import styled from "styled-components";
import { faSpinner, faCircle } from "@fortawesome/free-solid-svg-icons";
import { selectNode } from "../helpers/nodeHelper";
import { NavigationButton } from "./NavigationButton";
import NodeName from "./NodeName";
import LevelGroup from "./LevelGroup";
import ActionButtons from "./ActionButtons";
import { LoadingIndicator } from "./LoadingIndicator";

// Estilos con styled-components
const NodeContainer = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  align-items: center;
  margin: 0;
  padding: 0 0.2em;
  border-radius: 6px;
  background-color: ${(props) => (props.isSelected ? "#e9e9e9" : "transparent")};
  cursor: pointer; // Replace the 'not-allowed' logic
  opacity: 1; // Remove the disabled opacity
  height: 40px;
  position: relative;
  width: 100%;
  overflow: hidden;

  &:hover {
    background-color: ${(props) =>
      !props.disabled && (props.isSelected ? "#f0f0f0" : "#f0f0f0")};
  }

  &::after {
    content: "";
    position: absolute;
    right: 35px;
    top: 0;
    height: 100%;
    width: 20px;
    background: linear-gradient(
      to right,
      transparent,
      ${(props) => (props.isSelected ? "#e9e9e9" : "white")}
    );
    pointer-events: none;
  }

  &:hover::after {
    background: linear-gradient(to right, transparent, #f0f0f0);
  }
`;

const TreeNode = ({
  node,
  level,
  expandedNodes,
  setExpandedNodes,
  searchTerm,
  selectedNode,
  setSelectedNode,
  config,
  traverse,
  renderHighlightedText,
  path, // Agregar 'path' como prop
}) => {
  const isExpanded = expandedNodes[node.id] || false;
  const hasChildren = !!node.children?.length;
  const isSelected = selectedNode === node.id;
  const isDisabled = config.disabledNodes?.includes(node.id);
  const match =
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (node.productStock &&
      node.productStock.some((stock) =>
        stock.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ));

  const getNodeIcon = () => {
    if (node.isLoading) return faSpinner;
    if (!hasChildren) return faCircle;
    return null;
  };

  // Eliminar la llamada incorrecta a findPathToNode
  // const path = findPathToNode([...], node.id); // Remover esta línea

  return (
    <div>
      <NodeContainer
        isSelected={isSelected}
        onClick={() =>
          selectNode({
            nodeId: node.id,
            node,
            level,
            config,
            selectedNode,
            setSelectedNode,
            setExpandedNodes,
            onNodeClick: config.onNodeClick,
          })
        }
      >
        <LevelGroup level={level} />

        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0, marginRight: 8 }}>
          <NavigationButton
            getNodeIcon={getNodeIcon}
            isExpanded={isExpanded}
            isSelected={isSelected}
            hasChildren={hasChildren}
            isLoading={node.isLoading}
            node={node}
            setExpandedNodes={setExpandedNodes}
          />
          <NodeName
            title={node.name}
            isMatch={match}
            children={node.children}
            isLoading={node.isLoading}
            searchTerm={searchTerm}
            config={config}
            matchedStockCount={node.matchedStockCount}
            renderHighlightedText={renderHighlightedText}
          />
          <LoadingIndicator isLoading={node.isLoading} />
        </div>

        <ActionButtons node={node} actions={config.actions} level={level} path={path} /> {/* Usar 'path' prop */}
      </NodeContainer>

      {isExpanded && hasChildren && (
        node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            level={level + 1}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
            searchTerm={searchTerm}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            config={config}
            traverse={traverse}
            renderHighlightedText={renderHighlightedText}
            path={path} // Asegurarse de pasar 'path' a los hijos si es necesario
          />
        ))
      )}
    </div>
  );
};

export default TreeNode;
