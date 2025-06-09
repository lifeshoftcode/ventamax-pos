import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Redux
import { toggleDeveloperModal, SelectDeveloperModal } from '../../../features/modals/modalSlice';
import { selectUser, selectIsTemporaryMode, selectOriginalBusinessId, selectIsTemporaryRoleMode, selectOriginalRole } from '../../../features/auth/userSlice';
import { selectAppMode } from '../../../features/appModes/appModeSlice';

// Componentes
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import Console from './components/Console';
import SelectionMode from './components/SelectionMode';
import CommandProcessor from './components/CommandProcessor';

/**
 * Modal de desarrollador con consola de comandos
 */
export const DeveloperModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalData = useSelector(SelectDeveloperModal);const user = useSelector(selectUser);
  const isTestMode = useSelector(selectAppMode);
  const isTemporaryMode = useSelector(selectIsTemporaryMode);
  const originalBusinessId = useSelector(selectOriginalBusinessId);
  const isTemporaryRoleMode = useSelector(selectIsTemporaryRoleMode);
  const originalRole = useSelector(selectOriginalRole);
    // Estados locales
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [commandInput, setCommandInput] = useState('');
  const [reactScanLoaded, setReactScanLoaded] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const commandProcessorRef = useRef(null);
  
  // Estados para autocompletado
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [autoCompleteSelectedIndex, setAutoCompleteSelectedIndex] = useState(-1);
  
  // Estado para el modo de selección
  const [selectionMode, setSelectionMode] = useState({
    active: false,
    items: [],
    selectedIndex: 0,
    onSelect: null,
    title: '',
    command: ''
  });
  
  // Estado para filtrado en modo selección
  const [filteredItems, setFilteredItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);

  // Verificar si el usuario es desarrollador
  const isDeveloper = user?.role === 'dev';
  
  // Funciones para agregar salida a la consola
  const addOutput = (content, type = 'result', html = false) => {
    const newLine = {
      id: Date.now() + Math.random(),
      content: content,
      type,
      html,
    };
    setConsoleOutput(prev => [...prev, newLine]);
  };

  const addCommandEcho = (command) => {
    const commandLine = {
      id: Date.now() + Math.random(),
      content: {
        prompt: 'C:\\VentaMax>',
        userCommand: command
      },
      type: 'command',
    };
    setConsoleOutput(prev => [...prev, commandLine]);
  };
    // Funciones para el modo de selección
  const enterSelectionMode = (items, title, onSelect, command = '') => {
    setOriginalItems(items); // Guardar items originales
    setFilteredItems(items); // Inicializar items filtrados
    setSelectionMode({
      active: true,
      items,
      selectedIndex: 0,
      onSelect,
      title,
      command
    });
  };
  // Función para filtrar items en modo selección
  const handleFilterSelection = (filterText) => {
    if (!selectionMode.active) return;
    
    console.log('Filtering with text:', filterText);
    console.log('Original items:', originalItems);
    
    if (!filterText.trim()) {
      // Si no hay texto de filtro, mostrar todos los items originales
      setFilteredItems(originalItems);
      setSelectionMode(prev => ({ ...prev, items: originalItems, selectedIndex: 0 }));
      console.log('Showing all items:', originalItems);
    } else {
      // Filtrar items basado en el texto
      const filtered = originalItems.filter(item => {
        const itemText = typeof item === 'string' ? item : (item.name || item.title || item.label || String(item));
        return itemText.toLowerCase().includes(filterText.toLowerCase());
      });
      
      setFilteredItems(filtered);
      setSelectionMode(prev => ({ ...prev, items: filtered, selectedIndex: 0 }));
      console.log('Filtered items:', filtered);
    }
  };

  // Actualiza la selección al hacer clic en un item
  const updateSelectedIndex = (index) => {
    setSelectionMode(prev => ({ ...prev, selectedIndex: index }));
  };

  const exitSelectionMode = () => {
    setSelectionMode({
      active: false,
      items: [],
      selectedIndex: 0,
      onSelect: null,
      title: '',
      command: ''
    });
    
    // Limpiar estados de filtro
    setOriginalItems([]);
    setFilteredItems([]);
    setCommandInput(''); // Limpiar el input al salir del modo selección
    
    // Limpiar las funciones globales para evitar memory leaks
    window.selectItem = undefined;
    window.confirmSelection = undefined;
    
    // Enfocar el input después de salir del modo selección
    setTimeout(() => {
      const input = document.querySelector('.console-terminal input');
      if (input) {
        input.focus();
      }
    }, 100);
  };const handleSelectionConfirm = () => {
    const { items, selectedIndex, onSelect } = selectionMode;
    const selectedItem = items[selectedIndex];
    
    exitSelectionMode();
    
    if (onSelect) {
      onSelect(selectedItem);
    }
    
    // Enfocar el input después de confirmar la selección
    setTimeout(() => {
      const input = document.querySelector('.console-terminal input');
      if (input) {
        input.focus();
      }
    }, 150);
  };
  
  // Funciones para autocompletado
  const updateAutoComplete = (input) => {
    if (!commandProcessorRef.current) return;
    
    const suggestions = commandProcessorRef.current.getCommandSuggestions(input);
    setAutoCompleteSuggestions(suggestions);
    setShowAutoComplete(suggestions.length > 0 && input.trim().length > 0);
    setAutoCompleteSelectedIndex(-1);
  };

  const handleAutoCompleteSuggestionSelect = (suggestion) => {
    setCommandInput(suggestion.command);
    setShowAutoComplete(false);
    setAutoCompleteSelectedIndex(-1);
  };

  const handleAutoCompleteSelectedIndexChange = (index) => {
    setAutoCompleteSelectedIndex(index);
  };
  
  // Actualizar autocompletado cuando cambia el input
  useEffect(() => {
    updateAutoComplete(commandInput);
  }, [commandInput]);
  
  // Inicializar CommandProcessor en el primer renderizado
  useEffect(() => {
    commandProcessorRef.current = new CommandProcessor({
      dispatch,
      navigate,
      user,
      isTestMode,
      isTemporaryMode,
      originalBusinessId,
      isTemporaryRoleMode,
      originalRole,
      addOutput,
      addCommandEcho,
      setReactScanLoaded,
      reactScanLoaded,
      setBusinesses,
      businesses,
      enterSelectionMode
    });
  }, [dispatch, navigate, user, isTestMode, isTemporaryMode, originalBusinessId, isTemporaryRoleMode, originalRole, reactScanLoaded, businesses]);
    // Cerrar modal si no es desarrollador
  useEffect(() => {
    if (modalData.isOpen && !isDeveloper) {
      dispatch(toggleDeveloperModal());
    }
  }, [modalData.isOpen, isDeveloper, dispatch]);  // Agregar listener global solo para ESC cuando estamos en modo selección
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Solo manejar ESC globalmente si el modal está abierto
      if (modalData.isOpen) {
        handleKeyDown(e);
      }
    };

    if (modalData.isOpen) {
      document.addEventListener('keydown', handleGlobalKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [modalData.isOpen]);

  // Si no es desarrollador, no renderizar nada
  if (!isDeveloper) return null;

  // Cerrar el modal
  const handleClose = () => {
    dispatch(toggleDeveloperModal());
  };  // Manejar entrada de teclado
  const handleKeyDown = (e) => {
    // Si estamos en modo de selección, solo manejar ESC para cancelar
    if (selectionMode.active) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        exitSelectionMode();
        addOutput('Selección cancelada.');
      }
      // Para cualquier otra tecla en modo selección, no hacer nada más
      return;
    }
    
    // Manejar autocompletado
    if (showAutoComplete && autoCompleteSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = autoCompleteSelectedIndex < autoCompleteSuggestions.length - 1 
          ? autoCompleteSelectedIndex + 1 
          : 0;
        setAutoCompleteSelectedIndex(newIndex);
        return;
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = autoCompleteSelectedIndex > 0 
          ? autoCompleteSelectedIndex - 1 
          : autoCompleteSuggestions.length - 1;
        setAutoCompleteSelectedIndex(newIndex);
        return;
      }
      
      if (e.key === 'Tab' || (e.key === 'Enter' && autoCompleteSelectedIndex >= 0)) {
        e.preventDefault();
        if (autoCompleteSelectedIndex >= 0 && autoCompleteSelectedIndex < autoCompleteSuggestions.length) {
          const selectedSuggestion = autoCompleteSuggestions[autoCompleteSelectedIndex];
          handleAutoCompleteSuggestionSelect(selectedSuggestion);
        }
        return;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowAutoComplete(false);
        setAutoCompleteSelectedIndex(-1);
        return;
      }
    }
    
    // Modo normal de comando
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Si hay autocompletado visible y ninguna sugerencia seleccionada, ocultarlo
      if (showAutoComplete) {
        setShowAutoComplete(false);
        setAutoCompleteSelectedIndex(-1);
      }
      
      if (commandInput.trim() && commandProcessorRef.current) {
        const executeCommand = async () => {
          const result = await commandProcessorRef.current.executeCommand(commandInput);
          
          // Manejar resultado del comando
          if (result && result.clearConsole) {
            setConsoleOutput([]);
          }
        };
        
        executeCommand();
        setCommandInput('');
      }
    }
    // Clear console with Ctrl+L (like real CMD)
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setConsoleOutput([]);
    }
  };
  // Texto de bienvenida de la consola
  const welcomeText = `
VentaMax Dev Console [Versión 1.5.0]
© 2024 VentaMax Software. Todos los derechos reservados.\n
ATENCIÓN: Esta consola está destinada exclusivamente para desarrolladores.
El uso incorrecto de estos comandos puede afectar el funcionamiento del sistema.\n
Escriba HELP para ver una lista de comandos disponibles.\n
`;

  return (
    <Modal visible={modalData.isOpen} onClose={handleClose}>
      <Header title="Consola de Desarrollador" />
      <ConsoleContainer>
        {/* Indicador de modo de selección */}
        {selectionMode.active && (
          <SelectionMode
            active={selectionMode.active}
            items={selectionMode.items}
            selectedIndex={selectionMode.selectedIndex}
            title={selectionMode.title}
            command={selectionMode.command}
            onExitSelectionMode={exitSelectionMode}
            onSelectionConfirm={handleSelectionConfirm}
            onSelectIndex={updateSelectedIndex}
            consoleOutput={consoleOutput}
            setConsoleOutput={setConsoleOutput}
          />
        )}
          <Console
          consoleOutput={consoleOutput}
          commandInput={commandInput}
          setCommandInput={setCommandInput}
          handleKeyDown={handleKeyDown}
          selectionMode={selectionMode}
          welcomeText={welcomeText}
          autoCompleteSuggestions={autoCompleteSuggestions}
          showAutoComplete={showAutoComplete}
          autoCompleteSelectedIndex={autoCompleteSelectedIndex}
          onAutoCompleteSuggestionSelect={handleAutoCompleteSuggestionSelect}
          onAutoCompleteSelectedIndexChange={handleAutoCompleteSelectedIndexChange}
          onFilterSelection={handleFilterSelection}
        />
      </ConsoleContainer>
    </Modal>  );
};

// Estilos adicionales
const ConsoleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export default DeveloperModal;
