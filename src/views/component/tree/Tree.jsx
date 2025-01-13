import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { traverse } from "./utils/traverseUtils";
import { defaultFilterNodes } from "./utils/filterUtils";
import { expandMatchingNodes } from "./utils/expandUtils";
import TreeHeader from "./components/TreeHeader";
import TreeContent from "./components/TreeContent";
import TreeNode from "./components/TreeNode";
import { renderHighlightedText } from "./utils/textUtils";

const Container = styled.div`
  font-family: Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  resize: horizontal;
  overflow: hidden;
  min-width: 250px;
  max-width: 800px;
`;

const Tree = ({ data = [], config = {}, selectedId }) => {
  const [manualExpandedNodes, setManualExpandedNodes] = useState({});
  const [searchExpandedNodes, setSearchExpandedNodes] = useState({});
  const [selectedNode, setSelectedNode] = useState(selectedId);
  const [searchTerm, setSearchTerm] = useState("");

  // Calcular expandedNodes combinando expansiones manuales con las de búsqueda
  const expandedNodes = { ...manualExpandedNodes, ...searchExpandedNodes };

  useEffect(() => {
    if (!searchTerm) {
      setSearchExpandedNodes({});
    } else {
      expandMatchingNodes(searchTerm, data, traverse, setSearchExpandedNodes);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    if (selectedId) {
      const path = findPathToNode(data, selectedId);
      if (path) {
        const expandedNodesMap = {};
        path.forEach(id => {
          expandedNodesMap[id] = true;
        });
        setManualExpandedNodes(prev => ({ ...prev, ...expandedNodesMap }));
      }
      setSelectedNode(selectedId);
    }
  }, [selectedId, data]);

  const handleToggleNode = (nodeId) => {
    setManualExpandedNodes((prev) =>
      prev[nodeId] ? { ...prev, [nodeId]: undefined } : { ...prev, [nodeId]: true }
    );
  };

  const handleToggleAll = () => {
    if (Object.keys(manualExpandedNodes).length > 0) {
      setManualExpandedNodes({});
      setSearchExpandedNodes({});
    } else {
      const allNodeIds = new Set();

      const collectNodeIds = (nodes) => {
        nodes.forEach(node => {
          allNodeIds.add(node.id);
          if (node.children) {
            collectNodeIds(node.children);
          }
        });
      };

      collectNodeIds(data);
      setManualExpandedNodes(
        Object.fromEntries([...allNodeIds].map(id => [id, true]))
      );
    }
  };

  const handleNodeClick = (node, level) => {
    setSelectedNode(node.id);
    // Opcional: pasar la ruta al estado si es necesario
  };

  const filterNodes = config.filterNodes || defaultFilterNodes;

  const filteredData = filterNodes(data, searchTerm, config);

  const findPathToNode = (nodes, nodeId, path = []) => {
    for (const node of nodes) {
      const currentPath = [...path, node.id];
      if (node.id === nodeId) {
        return currentPath;
      }
      if (node.children) {
        const result = findPathToNode(node.children, nodeId, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return (
    <Container>
      <TreeHeader
        handleToggleAll={handleToggleAll}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TreeContent
        filteredData={filteredData}
        selectedId={selectedId}
      >
        {filteredData.map((node) => {
          const path = findPathToNode(data, node.id); // Obtener la ruta

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
              config={config}
              traverse={traverse}
              renderHighlightedText={renderHighlightedText}
              path={path} // Pasar la ruta
              onNodeClick={handleNodeClick} // Asegurar que el clic actualiza correctamente
            />
          );
        })}
      </TreeContent>
    </Container>
  );
};

export default Tree;