import { Alert } from "antd"
import ColoredNumber from "../../../../../../../../../templates/system/ColoredNumber/ColoredNumber"
import { useFormatPrice } from "../../../../../../../../../../hooks/useFormatPrice"
import { useFormatNumber } from "../../../../../../../../../../hooks/useFormatNumber"

export const ARValidateMessage = ({
    isGenericClient,
    clientId,
    invoiceId,
    isWithinCreditLimit,
    isWithinInvoiceCount,
    activeAccountsReceivableCount,
    creditLimit,
    currentBalance,
    creditLimitValue
}) => {
    return (
        <>
            {
                isGenericClient && <Alert
                    message="No se puede agregar a CXC a un cliente genérico"
                    type="error"
                    showIcon
                />
            }
            {
                !clientId && !invoiceId && <Alert
                    message="No se puede agregar a CXC sin cliente o factura"
                    type="error"
                    showIcon
                />
            }
            {
               (creditLimit != null && creditLimit?.creditLimit?.status) && !isWithinCreditLimit && <Alert
                message={
                    <>
                      El saldo de la factura excede el límite de crédito:{" "}
                      <ColoredNumber value={useFormatPrice(creditLimitValue)} color={'red'} /> / {" "}
                      <ColoredNumber value={useFormatPrice(creditLimit?.creditLimit?.value)}/>
                      
                    </>
                  }
                    type="error"
                    showIcon
                />
            }
            {
               (creditLimit != null && creditLimit?.invoice?.status) && !isWithinInvoiceCount && <Alert
                    message={`El límite de cuenta por cobrar ha sido alcanzado. Facturas actuales: ${useFormatNumber(activeAccountsReceivableCount)} / ${useFormatNumber(creditLimit?.invoice?.value)}`}
                    type="error"
                    showIcon
                />
            }
            {
                (creditLimit == null ) && <Alert   
                    message="Para agregar a CXC, el cliente debe tener un límite de crédito configurado."
                    description="Editar Cliente -> Info. Financiera -> Límite de Crédito"
                    type="error"
                    showIcon    
                />
            }
        </>
    )
}