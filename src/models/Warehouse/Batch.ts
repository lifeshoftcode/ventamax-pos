import { AuditInfo } from "./AuditInfo";

export interface Batch extends AuditInfo {
  id: string; // auto-generated
  productId: string; // Referencia al Producto
  shortName: string; // Nombre corto del lote
  batchNumber: string; // Número de lote
  manufacturingDate?: Date; // Fecha de fabricación del lote
  expirationDate?: Date; // Fecha de expiración del lote (opcional)
  status: 'active' | 'inactive'; // Estado del lote
  receivedDate: Date; // Fecha de recepción del lote
  providerId: string; // Referencia al Proveedor
  notes?: string; // Notas del lote
  count: number; // Cantidad total de productos en el lote
}
