import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const modalData = useSelector(SelectDeveloperModal);  const user = useSelector(selectUser);
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
  
  // Estado para el modo de selección
  const [selectionMode, setSelectionMode] = useState({
    active: false,
    items: [],
    selectedIndex: 0,
    onSelect: null,
    title: '',
    command: ''
  });

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
    setSelectionMode({
      active: true,
      items,
      selectedIndex: 0,
      onSelect,
      title,
      command
    });
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
    
    // Limpiar las funciones globales para evitar memory leaks
    window.selectItem = undefined;
    window.confirmSelection = undefined;
  };

  const handleSelectionConfirm = () => {
    const { items, selectedIndex, onSelect } = selectionMode;
    const selectedItem = items[selectedIndex];
    
    exitSelectionMode();
    
    if (onSelect) {
      onSelect(selectedItem);
    }  };
  
  // Inicializar CommandProcessor en el primer renderizado
  useEffect(() => {
    commandProcessorRef.current = new CommandProcessor({
      dispatch,
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
  }, [dispatch, user, isTestMode, isTemporaryMode, originalBusinessId, isTemporaryRoleMode, originalRole, reactScanLoaded, businesses]);
  
  // Cerrar modal si no es desarrollador
  useEffect(() => {
    if (modalData.isOpen && !isDeveloper) {
      dispatch(toggleDeveloperModal());
    }
  }, [modalData.isOpen, isDeveloper, dispatch]);

  // Si no es desarrollador, no renderizar nada
  if (!isDeveloper) return null;

  // Cerrar el modal
  const handleClose = () => {
    dispatch(toggleDeveloperModal());
  };

  // Manejar entrada de teclado
  const handleKeyDown = (e) => {
    // Si estamos en modo de selección, solo permitir Escape para cancelar
    if (selectionMode.active) {
      e.preventDefault();
      
      // Solo permitir ESC para cancelar
      if (e.key === 'Escape') {
        exitSelectionMode();
        addOutput('Selección cancelada.');
      }
      return;
    }    // Modo normal de comando
    if (e.key === 'Enter') {
      e.preventDefault();
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
      <Header title="VentaMax - Consola de Desarrollador" />
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
        
        {/* Consola de comandos */}
        <Console
          consoleOutput={consoleOutput}
          commandInput={commandInput}
          setCommandInput={setCommandInput}
          handleKeyDown={handleKeyDown}
          selectionMode={selectionMode}
          welcomeText={welcomeText}
        />
      </ConsoleContainer>
    </Modal>
  );
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
