// styledComponents.js
import styled from 'styled-components';

// Container components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

export const SubsectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
`;

// Form elements
export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    height: 1.25rem;
    width: 1.25rem;
    margin-right: 0.5rem;
    accent-color: #4f46e5;
  }

  label {
    margin-bottom: 0;
  }
`;

export const HelperText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

// Button components
export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #4f46e5;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #6b7280;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #4b5563;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #ef4444;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #dc2626;
  }
`;

export const SuccessButton = styled(Button)`
  background-color: #10b981;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #059669;
  }
`;

export const OutlineButton = styled(Button)`
  background-color: transparent;
  color: #4f46e5;
  border: 1px solid #4f46e5;

  &:hover:not(:disabled) {
    background-color: rgba(79, 70, 229, 0.05);
  }
`;

// Table components
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
`;

export const TableHeader = styled.div`
  display: flex;
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableHeaderCell = styled.div`
  flex: ${props => props.flex || 1};
  text-align: ${props => props.align || 'left'};
  padding: 0 0.5rem;
`;

export const TableRow = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: ${props => props.isEven ? '#f9fafb' : 'white'};

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  flex: ${props => props.flex || 1};
  text-align: ${props => props.align || 'left'};
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => props.lineThrough && 'text-decoration: line-through; color: #9ca3af;'}
  ${props => props.highlight && 'font-weight: 500; color: #10b981;'}
`;

// Alert components
export const Alert = styled.div`
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  ${props => {
    switch (props.type) {
      case 'error':
        return 'background-color: #fee2e2; border-left: 4px solid #ef4444; color: #b91c1c;';
      case 'success':
        return 'background-color: #d1fae5; border-left: 4px solid #10b981; color: #065f46;';
      case 'warning':
        return 'background-color: #fff7ed; border-left: 4px solid #f59e0b; color: #b45309;';
      case 'info':
      default:
        return 'background-color: #e0f2fe; border-left: 4px solid #3b82f6; color: #1e40af;';
    }
  }}
`;

// Grid layout
export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(1, 1fr)'};
  gap: ${props => props.gap || '1rem'};

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Col = styled.div`
  grid-column: span ${props => props.span || 1};
`;

// Result card components
export const StatCard = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const StatLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.color || '#111827'};
`;

// Virtualized list container
export const VirtualizedListContainer = styled.div`
  height: 400px;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
`;