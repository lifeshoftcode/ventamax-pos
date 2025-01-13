export const expandNodePath = (nodeId, nodes) => {
    const findAndExpandPath = (currentNodes, targetId, path = []) => {
        for (let node of currentNodes) {
            const currentPath = [...path, node.id];
            if (node.id === targetId) {
                setExpandedNodes(prev => ({
                    ...prev,
                    ...currentPath.reduce((acc, id) => ({ ...acc, [id]: true }), {})
                }));
                return true;
            }
            if (node.children && findAndExpandPath(node.children, targetId, currentPath)) {
                return true;
            }
        }
        return false;
    };

    findAndExpandPath(nodes, nodeId);
};

export const expandAll = (nodes, setExpandedNodes) => {
    const expandedState = {};
    const traverse = (currentNodes) => {
        currentNodes.forEach(node => {
            if (node.children) {
                expandedState[node.id] = true;
                traverse(node.children);
            }
        });
    };
    traverse(nodes);
    setExpandedNodes(expandedState);
};

export const collapseAll = (setExpandedNodes) => {
    setExpandedNodes({});
};