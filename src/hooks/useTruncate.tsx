import { useState, useRef, useEffect, RefObject } from 'react';

interface UseTruncateResult {
  isTruncated: boolean;
  truncatedText: string;
  textRef: RefObject<HTMLSpanElement>;
  showTooltip: boolean;
}

const useTruncate = (
  text: string | null | undefined,
  containerRef: RefObject<HTMLElement>,
  useTooltip: boolean = true
): UseTruncateResult => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [truncatedText, setTruncatedText] = useState<string>(text || '');
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!text) {
      setIsTruncated(false);
      setTruncatedText('');
      return;
    }

    const containerElement = containerRef.current;
    const element = textRef.current;
    if (!containerElement || !element) return;

    const calculateTruncate = () => {
      const style = window.getComputedStyle(containerElement);
      const containerWidth = containerElement.clientWidth;
      const containerHeight = containerElement.clientHeight;
      const lineHeight = parseInt(style.lineHeight) || parseInt(style.fontSize);
      
      // Crear un elemento temporal para medir el texto
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.style.font = style.font;
      document.body.appendChild(tempSpan);

      // Función para medir si el texto cabe
      const measureText = (testText: string) => {
        tempSpan.textContent = testText;
        const fits = tempSpan.offsetWidth <= containerWidth;
        return fits;
      };

      // Si el texto original cabe completamente
      if (measureText(text)) {
        setIsTruncated(false);
        setTruncatedText(text);
        document.body.removeChild(tempSpan);
        return;
      }

      // Búsqueda binaria para encontrar el número correcto de caracteres
      let left = 0;
      let right = text.length;
      let bestFit = '';

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const testText = text.slice(0, mid) + '...';
        
        if (measureText(testText)) {
          bestFit = testText;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      document.body.removeChild(tempSpan);
      setIsTruncated(true);
      setTruncatedText(bestFit);
    };

    calculateTruncate();

    const resizeObserver = new ResizeObserver(calculateTruncate);
    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text, containerRef, useTooltip]);

  return {
    isTruncated,
    truncatedText,
    textRef,
    showTooltip: isTruncated && useTooltip,
  };
};

export default useTruncate;