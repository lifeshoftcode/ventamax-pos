import { useState, useMemo, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectClient,
  selectClientMode,
  selectClientSearchTerm,
  selectIsOpen,
  setClientMode,
  setIsOpen
} from '../../../../../features/clientCart/clientCartSlice'
import { CLIENT_MODE_BAR } from '../../../../../features/clientCart/clientMode'
import { filtrarDatos } from '../../../../../hooks/useSearchFilter'
import { toggleClientModal } from '../../../../../features/modals/modalSlice'
import { OPERATION_MODES } from '../../../../../constants/modes'
import { fbDeleteClient } from '../../../../../firebase/client/fbDeleteClient'
import { selectUser } from '../../../../../features/auth/userSlice'
import { useFbGetClientsOnOpen } from '../../../../../firebase/client/useFbGetClientsOnOpen'

const ClientSelectionModal = lazy(() => import('./components/ClientSelectionModal').then(module => ({ default: module.ClientSelectionModal })))
const ClientSelectionToolbar = lazy(() => import('./components/ClientSelectionToolbar').then(module => ({ default: module.ClientSelectionToolbar })))
const ClientListContainer = lazy(() => import('./components/ClientListContainer').then(module => ({ default: module.ClientListContainer })))
const ClientPaginationBar = lazy(() => import('./components/ClientPaginationBar').then(module => ({ default: module.ClientPaginationBar })))

export const ClientSelector = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const user = useSelector(selectUser);
  const mode = useSelector(selectClientMode);
  const selectedClient = useSelector(selectClient);
  const searchTerm = useSelector(selectClientSearchTerm);
  const { clients, loading } = useFbGetClientsOnOpen({ isOpen});

  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const getDuplicateClients = (clients) => {
    const namesCount = clients.reduce((acc, { client }) => {
      const name = client.name?.toLowerCase();
      if (name) acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return clients.filter(({ client }) => client.name && namesCount[client.name.toLowerCase()] > 1);
  };

  const getClientsWithoutNames = (clients) => clients.filter(({ client }) => !client.name);

  const filteredClients = useMemo(() => filtrarDatos(clients, searchTerm), [clients, searchTerm]);
  const duplicateClients = useMemo(() => getDuplicateClients(clients), [clients]);
  const clientsWithoutNames = useMemo(() => getClientsWithoutNames(clients), [clients]);

  const filteredClientsToShow = useMemo(() => {
    return filter === 'duplicates' ? duplicateClients : filter === 'noName' ? clientsWithoutNames : filteredClients;
  }, [filter, duplicateClients, clientsWithoutNames, filteredClients]);
  const paginatedClients = useMemo(() => {
    return filteredClientsToShow.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredClientsToShow, currentPage, pageSize]);

  const handleMenuClick = (e) => setFilter(e.key);

  const openAddClientModal = () => {
    dispatch(setIsOpen(false));
    dispatch(toggleClientModal({ mode: OPERATION_MODES.CREATE.id, data: null, addClientToCart: true }));
  };

  const openUpdateClientModal = (client) => {
    dispatch(setIsOpen(false));
    dispatch(setClientMode(CLIENT_MODE_BAR.UPDATE.id));
    dispatch(toggleClientModal({ mode: OPERATION_MODES.UPDATE.id, data: client, addClientToCart: true }));
  };

  const handleDeleteClient = async (id) => {
    await fbDeleteClient(user?.businessID, id);
  };

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Suspense>
      <ClientSelectionModal isOpen={isOpen} onClose={handleClose}>
        <ClientSelectionToolbar
          filter={filter}
          filteredClientsToShow={filteredClientsToShow}
          handleMenuClick={handleMenuClick}
          openAddClientModal={openAddClientModal}
          onClose={handleClose}
        />
        
        <ClientListContainer
          paginatedClients={paginatedClients}
          loading={loading}
          selectedClient={selectedClient}
          openUpdateClientModal={openUpdateClientModal}
          handleDeleteClient={handleDeleteClient}
          onClose={handleClose}
          searchTerm={searchTerm}
        />
        
        <ClientPaginationBar
          filteredClients={filteredClients}
          clients={clients}
          currentPage={currentPage}
          pageSize={pageSize}
          filteredClientsToShow={filteredClientsToShow}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      </ClientSelectionModal>
    </Suspense>
  );
}
