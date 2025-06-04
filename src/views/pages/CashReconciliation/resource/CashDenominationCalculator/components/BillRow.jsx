import { InputNumber } from "antd"
import { FormattedValue } from "../../../../../templates/system/FormattedValue/FormattedValue"
import styled from "styled-components"
import { useFormatPrice } from "../../../../../../hooks/useFormatPrice"
import PropTypes from 'prop-types'

export const BillRow = ({ bill, index, inputDisabled, readOnly = false, updateBillQuantity }) => {
  const formattedTotal = useFormatPrice(bill.value * bill.quantity)

  return (
    <BillRowContainer>
      <BillRef>{bill.ref}</BillRef>
      <InputNumber
        min={0}
        value={bill.quantity}
        readOnly={readOnly}
        disabled={!!inputDisabled}
        onChange={(value) => updateBillQuantity(index, value)}
        placeholder={'cantidad'}
        style={{ width: '100%' }}
        aria-label={`Cantidad para denominación ${bill.ref}`}
      />
      <FormattedValue
        type={'subtitle'}
        value={formattedTotal}
        size={'small'}
        align={'right'}
      />
    </BillRowContainer>
  )
}

BillRow.propTypes = {
  bill: PropTypes.shape({
    ref: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  inputDisabled: PropTypes.bool,
  updateBillQuantity: PropTypes.func.isRequired
}

const BillRowContainer = styled.div`
    display: grid;
    grid-template-columns: 3em 10em 1fr;
    gap: 1.4em;
    border-radius: var(--border-radius);
    align-items: center;
`

const BillRef = styled.div`
    width: 3.4em;
    text-align: right;
`
