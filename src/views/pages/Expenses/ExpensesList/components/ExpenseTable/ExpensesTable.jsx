/**
 * @file ExpensesTable.jsx
 * @desc A component that renders a table of expenses.
 * @version 0.1.0
 * @since 0.1.0
 */

import React, { useState } from 'react'
import styled from 'styled-components'
import { AdvancedTable } from '../../../../../templates/system/AdvancedTable/AdvancedTable'
import { truncateString } from '../../../../../../utils/text/truncateString'
import { Button } from '../../../../../templates/system/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImageViewer } from '../../../../../../features/imageViewer/imageViewerSlice'
import { convertMillisToDate } from '../../../../../../hooks/useFormatTime'
import { EditDelBtns } from '../../../../../templates/system/Button/EditDelBtns/EditDelBtns'
import { useFormatPrice } from '../../../../../../hooks/useFormatPrice'
import { setExpense, setExpenseMode } from '../../../../../../features/expense/expenseManagementSlice'
import { useNavigate } from 'react-router-dom'
import { DateTime } from 'luxon'
import { fbDeleteExpense } from '../../../../../../firebase/expenses/Items/fbDeleteExpense'
import { selectUser } from '../../../../../../features/auth/userSlice'
import { useTranslation, initReactI18next } from "react-i18next";
import { ExpenseChart } from '../ExpenseReport/ExpenseReport'
/**
 * @function ExpensesTable
 * @desc A component that renders a table of expenses.
 * @returns {JSX.Element} The ExpensesTable component
 */
export const ExpensesTable = ({ searchTerm, expenses, dateRange, setDateRange }) => {
    const { t } = useTranslation('status');
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    const [reportIsOpen, setReportIsOpen] = useState(false);
    const handleReportOpen = () => setReportIsOpen(!reportIsOpen);
    const data = expenses
        .map(({ expense }) => {
            return {
                number: expense.numberId,
                category: expense.category,
                description: expense.description,
                dateExpense: expense?.dates?.expenseDate,
                amount: expense.amount,
                receiptImg: expense.receiptImageUrl,
                action: expense,
                status: expense.status,
                createdAt: expense.dates.createdAt,
                dateGroup: DateTime.fromMillis(expense.dates.createdAt).toLocaleString(DateTime.DATE_FULL)
            }
        })
        .sort((a, b) => b.number - a.number)

    const columns = [
        {
            Header: '#',
            accessor: 'number',
            minWidth: '50px',
            maxWidth: '50px',
            reorderable: false,
            sortable: true,
        },
        {
            Header: 'Categoría',
            accessor: 'category',
            minWidth: '50px',
            maxWidth: '1fr',
        },
        {
            Header: "Descripción",
            accessor: 'description',
            minWidth: '60px',
            maxWidth: '1fr',
            cell: ({ value }) => truncateString(value, 18)
        },
        {
            Header: 'Fecha de Gasto',
            accessor: 'dateExpense',
            minWidth: '50px',
            maxWidth: '1fr',
            cell: ({ value }) => convertMillisToDate(value)
        },
        {
            Header: 'Importe',
            accessor: 'amount',
            minWidth: '50px',
            maxWidth: '1fr',
            cell: ({ value }) => useFormatPrice(value)
        },
        {
            Header: 'Recibo',
            accessor: 'receiptImg',
            minWidth: '70px',
            maxWidth: '70px',
            cell: ({ value }) => {
                const handleClick = () => {
                    dispatch(toggleImageViewer({ show: true, url: value }))
                }
                return (
                    <Button title='Ver' onClick={handleClick} />
                )
            }
        },
        {
            Header: 'Acción',
            accessor: 'action',
            minWidth: '80px',
            maxWidth: '70px',
            align: 'right',
            reorderable: false,
            cell: ({ value }) => {
                const handleUpdate = async () => {
                    dispatch(setExpense(value));
                    dispatch(setExpenseMode('update'));
                    navigate('/expenses/new');
                }
                const handleDelete = async () => {
                    await fbDeleteExpense(user, value);
                }
                return (
                    <EditDelBtns
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                )
            }
        }
    ]
  

    return (
        <Container>
            <AdvancedTable
                columns={columns}
                data={data}
                elementName={'Gasto'}
                datePicker
                filterUI
                searchTerm={searchTerm}
                dateRange={dateRange}
                setDateRange={setDateRange}
                groupBy={'dateGroup'}
                defaultDate={'today'}
                datesKeyConfig='dateGroup'
                filterConfig={[
                    {
                        label: 'Categoría',
                        accessor: 'category',
                    },
                    {
                        label: 'Estado',
                        accessor: 'status',
                        defaultValue: 'active',
                        format: (value) => t(value)
                    }
                ]}
            />
             <ExpenseChart expenses={expenses} isOpen={reportIsOpen} onOpen={handleReportOpen} />
        </Container>
    )
}

const Container = styled.div`
    height: calc(100vh - 2.75em);
    width: 100%;
    display: grid;    
`
