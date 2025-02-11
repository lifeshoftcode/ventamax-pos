import React, { useMemo, useCallback, memo } from "react";
import styled from "styled-components";
import { traverse } from "./utils/traverseUtils";
import { defaultFilterNodes } from "./utils/filterUtils";
import { expandMatchingNodes } from "./utils/expandUtils";
import TreeHeader from "./components/TreeHeader";
import TreeContent from "./components/TreeContent";
import TreeNode from "./components/TreeNode";
import { renderHighlightedText } from "./utils/textUtils";
import useExpandedNodes from "./hooks/useExpandedNodes";
import useSearchTerm from "./hooks/useSearchTerm";
import useSelectedNode from "./hooks/useSelectedNode";
import { findPathToNode } from "./utils/nodeUtils";

const Container = styled.div`
  font-family: Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  resize: horizontal;
  overflow: hidden;
  min-width: 250px;
  max-width: 400px;
  padding: 8px; 
`;

const Tree = memo(({ data = [], config = {}, selectedId }) => {
  // Establecer valores por defecto para la configuración
  const defaultConfig = {
    showAllOnSearch: true,
    initialVisibleCount: undefined,
    ...config
  };

  const {
    expandedNodes,
    handleToggleNode,
    handleToggleAll,
    manualExpandedNodes,
    searchExpandedNodes,
    manuallyClosedNodes,
    setManualExpandedNodes,
    setSearchExpandedNodes,
    setManuallyClosedNodes,
  } = useExpandedNodes(data);

  const { searchTerm, setSearchTerm } = useSearchTerm(data, manuallyClosedNodes, setSearchExpandedNodes);

  const { selectedNode, setSelectedNode } = useSelectedNode(data, selectedId, manuallyClosedNodes, setManualExpandedNodes);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node.id);
  }, [setSelectedNode]);

  const filteredData = useMemo(() => 
    (defaultConfig.filterNodes || defaultFilterNodes)(data, searchTerm, defaultConfig),
    [data, searchTerm, defaultConfig]
  );

  const visibleData = useMemo(() => {
    const filtered = (defaultConfig.filterNodes || defaultFilterNodes)(data, searchTerm, defaultConfig);
    
    // Si hay término de búsqueda, siempre mostrar todos (por defecto)
    if (searchTerm) {
      return filtered;
    }
    
    // Solo aplicar límite inicial si está configurado
    if (!searchTerm && defaultConfig.initialVisibleCount) {
      return filtered.slice(0, defaultConfig.initialVisibleCount);
    }
    
    return filtered;
  }, [data, searchTerm, defaultConfig]);

  return (
    <Container>
      <TreeHeader
        handleToggleAll={handleToggleAll}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TreeContent filteredData={filteredData} selectedId={selectedId}>
        {visibleData.map((node) => {
          const path = findPathToNode(data, node.id);
          return (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              expandedNodes={expandedNodes}
              setExpandedNodes={setManualExpandedNodes}
              searchTerm={searchTerm}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              config={defaultConfig}
              traverse={traverse}
              renderHighlightedText={renderHighlightedText}
              path={path}
              onNodeClick={handleNodeClick}
              onToggleNode={handleToggleNode}
            />
          );
        })}
        {!searchTerm && defaultConfig.initialVisibleCount && filteredData.length > defaultConfig.initialVisibleCount && (
          <div style={{ 
            padding: '8px 16px', 
            color: '#666', 
            fontSize: '0.9em',
            textAlign: 'center' 
          }}>
            Mostrando {defaultConfig.initialVisibleCount} de {filteredData.length} elementos.
            Use la búsqueda para ver más.
          </div>
        )}
      </TreeContent>
    </Container>
  );
});

export default Tree;
