import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList/UsersList';
import { getUsersRequest } from '../../services/Server/UserServices';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}api/user`
        );
        setUsers(response);
      } catch (error) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && users && <UsersList users={users} />}
    </>
  );
};

export default Users;
