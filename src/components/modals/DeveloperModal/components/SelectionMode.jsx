import React, { useEffect } from 'react';
import styled from 'styled-components';

/**
 * Componente para manejar el modo de selección interactiva en la consola
 */
const SelectionMode = ({
  active,
  items,
  selectedIndex,
  title,
  command,
  onExitSelectionMode,
  onSelectionConfirm,
  onSelectIndex,
  consoleOutput,
  setConsoleOutput
}) => {
  // No renderizar nada si el modo de selección no está activo
  if (!active) return null;

  /**
   * Muestra la lista de selección
   */
  const displaySelectionList = () => {
    // Eliminar la lista anterior si existe
    setConsoleOutput(prev => prev.filter(line => 
      line.type !== 'selection' || 
      (line.type === 'selection' && line.command !== command)
    ));
    
    // Crear la nueva línea de selección con formato HTML y elementos clicables
    const selectionLine = {
      id: Date.now() + Math.random(),
      content: `<div style="color:#66d9ef;font-weight:bold;margin-bottom:10px;">${title}</div>
<div style="margin-left:4px;margin-bottom:10px;">
${items.map((item, index) => {
  const isSelected = index === selectedIndex;
  const itemClass = isSelected ? 'selection-active' : 'selection-inactive';
  const icon = isSelected ? '🔹' : '▫️';  // Hacer cada elemento clicable 
  return `<div style="padding:4px 0;cursor:pointer;margin-bottom:2px;" 
      onclick="window.selectItem(${index}, event)" 
      ondblclick="window.confirmSelection(${index}, event)"
      data-index="${index}" 
      class="selectable-item ${isSelected ? 'selected' : ''}">
      <span class="${itemClass}">${icon} ${item.display || item.name || item}</span>
  </div>`;
}).join('')}
</div>
<div style="color:#888;font-size:12px;margin-top:5px;border-top:1px solid #333;padding-top:8px;">
Haga clic para seleccionar, doble clic para confirmar, o presione ESC para cancelar.
</div>`,
      type: 'selection',
      html: true,
      command,
    };
    
    setConsoleOutput(prev => [...prev, selectionLine]);
    
    
    // Definir funciones globales para manejar los clics
    window.selectItem = (index, event) => {
      // Actualizar estado de selección en React
      onSelectIndex?.(index);
      // Evitar que el evento burbujee y cause scroll indeseado
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Crear nueva selección sin resetear el scroll
      const newLine = { ...selectionLine };
      newLine.id = Date.now() + Math.random();
      newLine.content = newLine.content.replace(/class="selectable-item selected"/g, 'class="selectable-item"')
        .replace(/class="selection-active"/g, 'class="selection-inactive"')
        .replace(/🔹/g, '▫️');
          
      // Marcar el elemento seleccionado
      newLine.content = newLine.content.replace(
        `data-index="${index}" class="selectable-item "`, 
        `data-index="${index}" class="selectable-item selected"`
      ).replace(
        `data-index="${index}"><span class="selection-inactive">▫️`, 
        `data-index="${index}"><span class="selection-active">🔹`
      );
      
      // Actualizar output sin cambiar scroll
      setConsoleOutput(prev => [
        ...prev.filter(line => 
          line.type !== 'selection' || 
          (line.type === 'selection' && line.command !== command)
        ),
        newLine
      ]);
      
    };    window.confirmSelection = (index, event) => {
      // Evitar que el evento burbujee
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Actualizar el selectedIndex al elemento en el que se hizo doble clic
      onSelectIndex?.(index);
      
      // Usar setTimeout para asegurar que el estado se actualice antes de confirmar
      setTimeout(() => {
        onSelectionConfirm();
      }, 0);
    };
  };

  // Mostrar la lista de selección al montar el componente
  useEffect(() => {
    if (active) {
      displaySelectionList();
    }
    
    // Limpiar las funciones globales al desmontar
    return () => {
      window.selectItem = undefined;
      window.confirmSelection = undefined;
    };
  }, [active, selectedIndex]); // Re-renderizar cuando cambia el índice seleccionado

  // Manejar eventos de teclado para cancelar (ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onExitSelectionMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExitSelectionMode]);

  return (
    <SelectionModeIndicator>
      <span>MODO DE SELECCIÓN ACTIVO</span>
      <span>Haga clic para seleccionar, doble clic para confirmar</span>
    </SelectionModeIndicator>
  );
};

// Indicador visual para el modo de selección
const SelectionModeIndicator = styled.div`
  position: sticky;
  top: 0;
  background: #0066cc;
  color: white;
  padding: 6px 12px;
  margin: -16px -16px 10px -16px; /* Compensar el padding del ConsoleTerminal */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 12px;
  font-weight: bold;
  z-index: 100;
  border-bottom: 1px solid #0055aa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  
  span:last-child {
    font-weight: normal;
    font-size: 11px;
    opacity: 0.9;
  }
`;

export default SelectionMode;
