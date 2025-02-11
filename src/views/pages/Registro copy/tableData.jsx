import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import * as ant from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice } from "../../../features/invoice/invoiceFormSlice";
import DateUtils from "../../../utils/date/dateUtils";
import { selectUser } from "../../../features/auth/userSlice";
import { fbCashCountStatus } from "../../../firebase/cashCount/fbCashCountStatus";
import { Tag } from "../../templates/system/Tag/Tag";
import { openInvoicePreviewModal } from "../../../features/invoice/invoicePreviewSlice";
import AccountsReceivablePaymentReceipt from "../checkout/receipts/AccountsReceivablePaymentReceipt/AccountsReceivablePaymentReceipt";

const EditButton = ({ value }) => {
  const dispatch = useDispatch()
  const data = value.data;
  const user = useSelector(selectUser)
  const [isCashCountOpen, setIsCashCountOpen] = useState();
  const componentToPrintRef = useRef(null)
  const [isAllowEdit, setIsAllowEdit] = useState(false)
  const is48HoursOld = data?.date?.seconds < (Date.now() / 1000) - 172800

  useEffect(() => {
    const checkCashCountStatus = async () => {
      if (user && data && typeof data.cashCountId !== 'undefined' && data.cashCountId !== null) {
        try {
          const isOpen = await fbCashCountStatus(user, data.cashCountId, "open");
          setIsAllowEdit(!isOpen && is48HoursOld);
        } catch (error) {
          setIsAllowEdit(true); // Asumir cerrado en caso de error
        }
      } else {
        setIsAllowEdit(true);
      }
    };
    checkCashCountStatus();
  }, [user, data?.cashCountId]);

  const handleEdit = () => {
    const invoiceData = {
      ...data,
      date: DateUtils.convertTimestampToMillis(data.date),
      payWith: data?.paymentMethod.find((method) => method.status === true)?.value,
      updateAt: DateUtils.convertTimestampToMillis(data?.updateAt),
      cancel: data?.cancel ? {
        ...data.cancel,
        cancelledAt: DateUtils.convertTimestampToMillis(data?.cancel?.cancelledAt),
      } : null
    }
    dispatch(addInvoice({ invoice: invoiceData }))
  }

  const handleRePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  })

  const handleViewMore = () => {
    dispatch(openInvoicePreviewModal(data))
  }

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
    }}>
      <AccountsReceivablePaymentReceipt ref={componentToPrintRef} data={data} />
      <ant.Button
        icon={<FontAwesomeIcon icon={faPrint} />}
        onClick={handleRePrint}
      />
      {/* <ant.Button
        icon={icons.editingActions.edit}
        onClick={handleEdit}
        disabled={isAllowEdit}
      />
      <ant.Button
        icon={icons.editingActions.show}
        onClick={handleViewMore}
      /> */}
    </div>
  )
}

export const columns = [
  // {
  //   Header: 'N°',
  //   accessor: 'numberID',
  //   sortable: true,
  //   align: 'left',
  //   maxWidth: '0.4fr',
  //   min: '120px',
  // },

  {
    Header: 'Cliente',
    accessor: 'client',
    sortable: true,
    align: 'left',
    maxWidth: '1.4fr',
    min: '150px',
    cell: ({ value }) => {
      if (!value) return (
        <Tag>
          No Disponible
        </Tag>
      )
      return (
        <div>
          {value}
        </div>
      )
    }
  },
  {
    Header: 'Fecha',
    accessor: 'date',
    sortable: true,
    align: 'left',
    maxWidth: '1.6fr',
    minWidth: '170px',
  },
  {
    Header: 'Realizado por',
    accessor: 'createdBy',
    sortable: true,
    align: 'left',
    cell: ({ value }) => value,
    maxWidth: '1fr',
    minWidth: '160px',
  },
  // {
  //   Header: 'Factura',
  //   accessor: 'invoice',
  //   align: 'right',
  //   cell: ({ value }) => value,
  //   maxWidth: '1fr',
  //   minWidth: '100px',
  // },
  {
    Header: 'Total Cobrado',
    accessor: 'total',
    align: 'right',
    description: 'Articulos comprados',
    maxWidth: '1fr',
    minWidth: '100px',
  },
  // {
  //   Header: 'Balance General',
  //   accessor: 'balance',
  //   align: 'right',
  //   cell: ({ value }) => useFormatPrice(value),
  //   description: 'Monto total de la compra',
  //   maxWidth: '1fr',
  //   minWidth: '110px',
  // },
  // {
  //   Header: 'Ver',
  //   align: 'right',
  //   accessor: 'ver',
  //   description: 'Nombre del vendedor que realizó la venta',
  //   maxWidth: '0.5fr',
  //   minWidth: '50px',
  //   cell: ({ value }) => <PrintButton value={value} />
  // },
  {
    Header: 'Acción',
    align: 'right',
    accessor: 'accion',
    description: 'Accion',
    maxWidth: '1fr',
    minWidth: '80px',
    cell: ({ value }) => <EditButton value={value} />
  }
]
export const tableData = {
  title: 'Reporte de ventas',
  headers: [
    {
      Header: 'N°',
      accessor: 'numberId',
      sortable: true,
      align: 'left',
      maxWidth: '1fr',
      min: '150px',
    },
    {
      name: 'RNC',
      align: 'left',
      description: 'Nombre del vendedor que realizó la venta',
      max: '1.4fr',
      min: '150px',
      cell: ({ value }) => {
        if (!value) return (
          <div>Hola</div>
        )
        return (
          <div>
            {value}
          </div>
        )
      }
    },
    {
      name: 'Cliente',
      align: 'left',
      description: 'Nombre del cliente que realizó la compra',
      max: '1.8fr',
      min: '170px',
    },
    {
      name: 'Fecha 6',
      align: 'left',
      description: 'Fecha en que se realizó la compra',
      max: '1fr',
      min: '160px',
    },
    {
      name: 'ITBIS',
      align: 'right',
      description: 'Impuesto sobre las ventas',
      max: '1fr',
      min: '100px',
    },
    {
      name: 'Pago con',
      align: 'right',
      description: 'Forma de pago utilizada',
      max: '1fr',
      min: '100px',
    },
    {
      name: 'Cambio',
      align: 'right',
      description: 'Cambio entregado al cliente',
      max: '1fr',
      min: '100px',
    },
    {
      name: 'TOTAL',
      align: 'right',
      description: 'Monto total de la compra',
      max: '1fr',
      min: '100px',
    },
    {
      name: 'ver',
      align: 'right',
      description: 'Nombre del vendedor que realizó la venta',
      max: '0.5fr',
      min: '50px'
    },
    {
      name: 'accion',
      align: 'right',
      description: '',
      max: '0.5fr',
      min: '50px'
    }

  ],
  messageNoData: 'No hay datos para mostrar',
};


