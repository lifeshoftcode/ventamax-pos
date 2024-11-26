import { useDispatch } from "react-redux";
import { getOrderConditionByID, getOrderStateByID } from "../../../../../../constants/orderAndPurchaseState";
import { setNote } from "../../../../../../features/noteModal/noteModalSlice";
import { StatusIndicatorDot } from "../StatusIndicatorDot/StatusIndicatorDot";
import { convertMillisToDate } from "../../../../../../utils/date/formatDate";
import { DateTime } from "luxon";
import { useFormatPrice } from "../../../../../../hooks/useFormatPrice";
import { ActionsButtonsGroup } from "../../ListItem/ActionsButtonsGroup";
import { Button, Tag } from "antd";

function NoteContainer({ value }) {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => dispatch(setNote({ note: value, isOpen: true }))}
    >
      Ver
    </Button>
  )
}
export const columns = [
  {
    Header: '#',
    accessor: 'number',
    minWidth: '50px',
    maxWidth: '50px',
  },
  {
    Header: 'Est',
    accessor: 'state',
    minWidth: '50px',
    maxWidth: '50px',
    cell: ({ value }) => <StatusIndicatorDot color={value ? getOrderStateByID(value)?.color : null} />
  },
  {
    Header: 'Proveedor',
    accessor: 'provider'
  },
  {
    Header: 'Nota',
    accessor: 'note',
    cell: ({ value }) => (
      <NoteContainer value={value} />
    )
  },
  {
    Header: 'F. Pedido',
    accessor: 'createdAt',
    cell: ({ value }) => <div>{convertMillisToDate(value)}</div>
  },
  {
    Header: 'F. Entrega',
    accessor: 'deliveryDate',
    cell: ({ value }) => <div>{convertMillisToDate(value)}</div>
  },
  {
    Header: 'F. Pago',
    accessor: 'paymentDate',
    cell: ({ value }) => {
      const paymentDate = DateTime.fromMillis(value);
      const now = DateTime.now();
      const isDueOrPast = now >= paymentDate;
      return (<Tag style={{ fontSize: "16px", padding: "5px" }} color={isDueOrPast ? 'error' : 'success'}>{convertMillisToDate(value)}</Tag>)
    }
  },
  {
    Header: 'Items',
    accessor: 'items',
    align: 'right',
    minWidth: '80px',
    maxWidth: '80px',
    cell: ({ value }) => <div>{value}</div>
  },
  {
    Header: 'Total',
    accessor: 'total',
    align: 'right',
    minWidth: '120px',
    maxWidth: '120px',
    cell: ({ value }) => <div>{useFormatPrice(value)}</div>
  },
  {
    Header: 'Acción',
    accessor: 'action',
    align: 'right',
    cell: ({ value }) => <ActionsButtonsGroup orderData={value} />,

  }
]
export const filterConfig = [
  {
    label: 'Proveedor',
    accessor: 'provider',
  },
  {
    label: 'Estado',
    accessor: 'state',
    format: (value) => `${getOrderStateByID(value)?.name}`,
    defaultValue: 'state_2'
  },
  {
    label: 'Condición',
    accessor: 'condition',
    format: (value) => `${getOrderConditionByID(value)}`
  }
];



