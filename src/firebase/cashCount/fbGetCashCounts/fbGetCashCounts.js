import { collection, doc, getDoc, onSnapshot, orderBy, query, QueryConstraint, where } from "firebase/firestore"
import { db } from "../../firebaseconfig"
import { DateTime } from "luxon"
import { getEmployeeData } from "./getEmployeeData"
import DateUtils from "../../../utils/date/dateUtils"
import { toMillis } from "../../../utils/firebase/toTimestamp"

export const buildQueryConstraints = (({
    startDate = null,
    endDate = null,
    status,
    sortField = 'cashCount.createdAt',
    userRef = null,
    sortAsc = true,
} = {}) => {
    const constraints = [];
    if (startDate) constraints.push(where(sortField, '>=', startDate));
    if (endDate) constraints.push(where(sortField, '<=', endDate));
    if (status) constraints.push(where('cashCount.state', '==', status));
    if (userRef) constraints.push(where('cashCount.opening.employee', '==', userRef));
    constraints.push(orderBy(sortField, sortAsc ? 'asc' : 'desc'));
    return constraints;
})

const transformCashCount = async (raw) => {
    const [
        opener,
        openerApproval,
        closer,
        closerApproval
    ] = await Promise.all([
        getEmployeeData(raw.opening.employee),
        getEmployeeData(raw.opening.approvalEmployee),
        getEmployeeData(raw.closing.employee),
        getEmployeeData(raw.closing.approvalEmployee)
    ]);

    if (raw.opening.date) { raw.opening.date = toMillis(raw.opening.date) }

    return {
        ...raw,
        updatedAt: toMillis(raw.updatedAt),
        createdAt: toMillis(raw.createdAt),
        opening: {
            ...raw.opening,
            employee: opener,
            approvalEmployee: openerApproval,
        },
        closing: {
            ...raw.closing,
            date: toMillis(raw.closing.date),
            employee: closer,
            approvalEmployee: closerApproval
        },
        sales: []
    }
}

const convertToJSDate = (ms) => ms ? DateTime.fromMillis(ms).toJSDate() : null;

export const fbListenCashCounts = (
    user,
    setCashCounts,
    dateRange,
    filterState,
    searchTerm
) => {
    if (!user?.businessID) return () => { };
    const ref = collection(db, 'businesses', user.businessID, 'cashCounts');

    const startDateJS = convertToJSDate(dateRange?.startDate);
    const endDateJS = convertToJSDate(dateRange?.endDate);


    const userDocRef = filterState.filters.user ? doc(db, "users", filterState.filters.user) : null;
    const constraints = buildQueryConstraints({ 
        startDate: startDateJS, 
        endDate: endDateJS, 
        status: filterState.filters.status,
        userRef: userDocRef,
        sortAsc: filterState.isAscending,
    });
    const q = query(ref, ...constraints);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
        if (snapshot.empty) {
            setCashCounts([]);
            return;
        }
        const cashCountsArray = snapshot.docs.map(async d => {
            return transformCashCount(d.data().cashCount);
        });
        const parsed = await Promise.all(cashCountsArray);

        if (searchTerm && searchTerm.trim() !== "") {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const searched = parsed.filter(cc => {
                return (
                    cc.incrementNumber?.toString().toLowerCase().includes(lowerSearchTerm) ||
                    cc.opening?.employee?.name?.toLowerCase().includes(lowerSearchTerm) ||
                    cc.state?.toLowerCase().includes(lowerSearchTerm)
                );
            });
            setCashCounts(searched);
        } else {
            setCashCounts(parsed);
        }
    }, (error) => {
        console.error("Error listening to cash counts:", error);
        setCashCounts([]);
    });

    return unsubscribe;
}