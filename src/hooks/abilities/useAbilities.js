import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectAbilities, 
    selectAbilitiesLoading, 
    selectAbilitiesError,
    loadUserAbilities 
} from '../../features/abilities/abilitiesSlice';
import { selectUser } from '../../features/auth/userSlice';
import { PureAbility } from '@casl/ability';

export const useAbilities = () => {
    const user = useSelector(selectUser);
    const abilities = useSelector(selectAbilities);
    const loading = useSelector(selectAbilitiesLoading);
    const error = useSelector(selectAbilitiesError);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user) { 
            dispatch(loadUserAbilities(user)); 
        }
    }, [user, dispatch]);
   
    return { abilities, loading, error };
}

export function userAccess() {
    const rules = useSelector(selectAbilities);
    const loading = useSelector(selectAbilitiesLoading);
    
    // Si está cargando, devolver abilities vacías
    if (loading || !rules) {
        return { abilities: new PureAbility([]), loading };
    }
    
    const abilities = new PureAbility(rules);
    return { abilities, loading };
}