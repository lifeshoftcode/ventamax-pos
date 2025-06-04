import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Variantes de animación para los elementos de la consola
const consoleLineVariants = {
  hidden: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.1 }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0, 0, 0.2, 1] }
  }
};

/**
 * Componente que muestra la salida de la consola y el prompt para entrada de comandos
 */
const Console = ({ 
  consoleOutput,
  commandInput,
  setCommandInput,
  handleKeyDown,
  selectionMode,
  welcomeText
}) => {
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // (Removed auto-scroll logic as requested)

  // Enfocar el input cuando el componente se monta
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  // (Removed global terminal ref exposure)

  return (
    <>
      <ConsoleTerminal ref={terminalRef} className="console-terminal">
        {/* Texto de bienvenida */}
        <WelcomeText>
          {welcomeText}
        </WelcomeText>
        
        {/* Salida de la consola */}
        {consoleOutput.map((line) => (
          <motion.div
            key={line.id}
            initial="hidden"
            animate="visible"
            variants={consoleLineVariants}
          >
            <ConsoleLine type={line.type}>
              {line.type === 'command' ? (
                <div className="content">
                  <span className="prompt">{line.content.prompt}</span>
                  <span className="user-command">{line.content.userCommand}</span>
                </div>
              ) : line.html ? (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              ) : (
                <div className="content">{line.content}</div>
              )}
            </ConsoleLine>
          </motion.div>
        ))}
        
        {/* Prompt de entrada de comandos */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ConsolePrompt>C:\\VentaMax&gt;</ConsolePrompt>
          <ConsoleInput
            ref={inputRef}
            value={selectionMode.active ? '' : commandInput}
            onChange={(e) => !selectionMode.active && setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectionMode.active ? 'Haga clic para seleccionar, doble clic para confirmar, ESC para cancelar' : ''}
            autoFocus
            disabled={selectionMode.active}
            style={{
              opacity: selectionMode.active ? 0.6 : 1,
              cursor: selectionMode.active ? 'not-allowed' : 'text'
            }}
          />
        </div>
      </ConsoleTerminal>
    </>
  );
};

// Estilos del componente
const ConsoleTerminal = styled.div`
  background-color: #0c0c0c;
  color: #c0c0c0;
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 14px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  border-radius: 0 0 4px 4px;
  
  /* Estilo para elementos seleccionables */
  .selectable-item {
    transition: background-color 0.1s ease;
    
    &:hover {
      background-color: rgba(0, 102, 204, 0.15);
    }
    
    &.selected {
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        inset: 0;
        border: 2px solid #0066cc;
        pointer-events: none;
        z-index: 10;
      }
    }
  }
  
  /* Authentic Windows CMD scrollbar */
  &::-webkit-scrollbar { 
    width: 16px; 
  }
  &::-webkit-scrollbar-track { 
    background: #000; 
  }
  &::-webkit-scrollbar-thumb { 
    background: #808080; 
    border: 1px solid #000;
    
    &:hover {
      background: #a0a0a0;
    }
    
    &:active {
      background: #606060;
    }
  }
  &::-webkit-scrollbar-corner {
    background: #000;
  }
`;

const WelcomeText = styled.div`
  color: #c0c0c0;
  margin-bottom: 0;
  white-space: pre-line;
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
`;

const ConsoleLine = styled.div`
  margin-bottom: ${props => {
    switch (props.type) {
      case 'command': return '2px';      // Poco espacio después de comandos
      case 'error': return '8px';       // Más espacio después de errores
      default: return '12px';           // Espacio generoso después de respuestas del sistema
    }
  }};
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  
  .content {
    color: ${props => {
      switch (props.type) {
        case 'command': return '#f5deb3'; // Color cremita para comandos del usuario
        case 'error': return '#ff6b6b';   // Rojo suave para errores
        case 'selection': return '#66d9ef'; // Azul claro para las selecciones interactivas
        default: return '#c0c0c0';        // Classic CMD silver/light gray para respuestas del sistema
      }
    }};
  }
  
  .prompt {
    color: #c0c0c0; // Color del sistema para el prompt C:\VentaMax>
  }
  
  .user-command {
    color: #f5deb3; // Color cremita solo para lo que escribe el usuario
  }
  
  .selection-active {
    color: #ffffff;
    background-color: #0066cc;
    padding: 0 5px;
    margin-left: -5px;
    border-radius: 2px;
  }
  
  .selection-inactive {
    color: #c0c0c0;
  }
`;

const ConsolePrompt = styled.span`
  color: #c0c0c0;
  margin-right: 0;
  user-select: none;
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 400;
`;

const ConsoleInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #f5deb3; /* Color cremita/beige para diferenciarlo del sistema */
  font-family: 'Consolas', 'Lucida Console', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  caret-color: #f5deb3;
  margin-left: 0;
  
  &::placeholder {
    color: #606060;
  }
  
  &::selection {
    background: #f5deb3;
    color: #000;
  }
`;

export default Console;
