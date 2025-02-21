import { useSelector } from 'react-redux';
import { selectInsuranceStatus } from '../features/insurance/insuranceSlice';
import { selectBusinessData } from '../features/auth/businessSlice';


const useInsuranceEnabled = () => {
    const business = useSelector(selectBusinessData);
    const insuranceSelected = useSelector(selectInsuranceStatus);
    
    return business?.businessType === 'pharmacy' && insuranceSelected;
};

export default useInsuranceEnabled;
