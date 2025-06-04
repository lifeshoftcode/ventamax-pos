import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import basic from './items/basic'
import sales from './items/sales'
import financialManagement from './items/financialManagement'
import inventory from './items/inventory'
import admin from './items/admin'
import contacts from './items/contacts'
import changelogs from './items/changelogs'
import utility from './items/utility'
import accountsReceivable from './items/accountsReceivable'
import insurance from './items/insurance'
import { filterMenuItemsByAccess } from '../../../../utils/menuAccess'

export const ChevronRight = <FontAwesomeIcon icon={faChevronRight} />
export const ChevronLeft = <FontAwesomeIcon icon={faChevronLeft} />

export const getMenuData = () => {
    const allMenuItems = [
        ...basic,
        ...sales,
        ...insurance,
        ...inventory,
        ...accountsReceivable,
        ...financialManagement,
        ...utility,
        ...contacts,
        ...admin,
        ...changelogs,
    ]

    return filterMenuItemsByAccess(allMenuItems, true);
}