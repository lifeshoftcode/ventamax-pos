import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as antd from 'antd'
import { icons } from '../../../../../../../../../constants/icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart, setPaymentMethod, recalcTotals } from '../../../../../../../../../features/cart/cartSlice'
const { Radio, Input, Form, Checkbox, InputNumber } = antd

export const PaymentMethods = () => {
    const dispatch = useDispatch()
    const cashInputRef = useRef(null)
    const cart = useSelector(selectCart)
    const cartData = cart.data;
    const paymentMethods = cartData.paymentMethod;
    const totalPurchase = cartData.totalPurchase.value;
    
    const paymentInfo = {
        cash: {
            label: 'Efectivo',
            icon: icons.finances.money
        },
        card: {
            label: 'Tarjeta',
            icon: icons.finances.card
        },
        transfer: {
            label: 'Transferencia',
            icon: icons.finances.transfer
        }
    }
    
    useEffect(() => {
        if (cashInputRef.current && document.activeElement !== cashInputRef.current && paymentMethods.some(method => method.method === 'cash' && method.status)) {
            cashInputRef.current.focus();
            cashInputRef.current.select();
        }
    }, [])    // Verifica si hay algún método de pago con valor establecido
    useEffect(() => {
        // Evitamos bucles infinitos estableciendo una flag para controlar si debemos actualizar
        const totalPaymentValue = paymentMethods.reduce((total, method) => {
            return method.status ? total + (Number(method.value) || 0) : total;
        }, 0);

        // Solo actualizamos si hay un método activo sin valor y totalPurchase tiene un valor válido
        if (totalPaymentValue === 0 && totalPurchase > 0) {
            const cashMethod = paymentMethods.find(method => method.method === 'cash' && method.status);
            if (cashMethod && cashMethod.value === 0) {
                // Usamos dispatch directamente para actualizar el método sin llamar a handleValueChange
                dispatch(setPaymentMethod({ ...cashMethod, value: totalPurchase }));
            }
        }
    // Solo se ejecuta cuando cambia totalPurchase (no cuando paymentMethods cambia)
    // para evitar bucles infinitos
    }, [totalPurchase]);    const handleStatusChange = (method, status) => {
        // Si se está habilitando un método de pago y no tiene valor establecido, establece el monto restante necesario
        let newValue = method.value;
        
        if (status && (!newValue || newValue === 0)) {
            const currentTotal = paymentMethods.reduce((total, m) => {
                if (m.status && m.method !== method.method) {
                    return total + (Number(m.value) || 0);
                }
                return total;
            }, 0);
            
            const remaining = totalPurchase - currentTotal;
            newValue = remaining > 0 ? remaining : 0;
        }
        
        // Combinamos las dos operaciones en una sola actualización de estado
        // para evitar renderizaciones múltiples y posibles bucles
        dispatch(setPaymentMethod({ ...method, status, value: status ? newValue : 0 }));
    };

    const handleValueChange = (method, newValue) => {
        // No llamamos a recalcTotals después de setPaymentMethod
        // ya que el middleware cartTotalsListener se encarga de esto
        dispatch(setPaymentMethod({ ...method, value: Number(newValue) }));
    };

    const handleReferenceChange = (method, newReference) => {
        dispatch(setPaymentMethod({ ...method, reference: newReference }));
    };

    return (
        <Container>
            <Form
                layout='vertical'
            >
                <Items>
                    {
                        paymentMethods.map((method) => {
                            return (
                                <Row
                                    key={method.method}
                                >
                                    <Checkbox
                                        checked={method.status}
                                        onChange={(e) => handleStatusChange(method, e.target.checked)}
                                    />
                                    <FormItem
                                        placeholder='Método de pago'
                                        label={paymentInfo[method.method].label}
                                    >
                                        {method.method === 'cash' ? (
                                            <InputNumber
                                                addonBefore={paymentInfo[method.method].icon}
                                                placeholder='$$$'
                                                value={method.value}
                                                disabled={!method.status}
                                                onChange={(e) => handleValueChange(method, e)}
                                                ref={cashInputRef} // Aplicar la referencia aquí
                                            />
                                        ) : (
                                            <InputNumber
                                                addonBefore={paymentInfo[method.method].icon}
                                                placeholder='$$$'
                                                value={method.value}
                                                disabled={!method.status}
                                                onChange={(e) => handleValueChange(method, e)}
                                            />
                                        )}
                                    </FormItem>
                                    {
                                        (method.reference !== undefined) && (
                                            <FormItem
                                                placeholder='Método de pago'
                                                label='Referencia'
                                            >
                                                <Input
                                                    placeholder='Referencia'
                                                    disabled={!method.status}
                                                    onChange={(e) => handleReferenceChange(method, e.target.value)}
                                                />
                                            </FormItem>
                                        )
                                    }
                                </Row>
                            )
                        })
                    }
                </Items>
            </Form>
        </Container>
    )
}
const Container = styled.div`
    padding: 0em 0em;
   
`
const Row = styled.div`
    display: grid;  
    grid-template-columns: min-content 0.8fr 1fr;
    gap: 0.6em;
`
const Items = styled.div`

    display: grid;
    gap: 1em;
`
const FormItem = styled(Form.Item)`
            .ant-form-item-label {
                padding: 0;
            }
                margin: 0 ;
            svg{
                font-size: 1.2em;
                color: #414141;
            }
`

