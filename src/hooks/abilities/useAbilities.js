import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAbilities,
    selectAbilitiesLoading,
    selectAbilitiesError,
    setAbilities,
    loadUserAbilities
} from '../../features/abilities/abilitiesSlice';
import { selectUser } from '../../features/auth/userSlice';
import { PureAbility } from '@casl/ability';

export const useAbilities = () => {
    const abilities = useSelector(selectAbilities);
    const loading = useSelector(selectAbilitiesLoading);
    const error = useSelector(selectAbilitiesError);

    return { abilities, loading, error };
}

export const useLoadUserAbilities = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(loadUserAbilities(user));
        }
    }, [user, dispatch]);
};

export function userAccess() {
    const rules = useSelector(selectAbilities);
    const loading = useSelector(selectAbilitiesLoading);

    // Crear abilities con las reglas disponibles
    const abilities = new PureAbility(rules || []);
    return { abilities, loading };
}