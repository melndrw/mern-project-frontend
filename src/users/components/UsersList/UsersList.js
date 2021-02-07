import React from 'react';
import './UsersList.css';
import { Center } from '@chakra-ui/react';
import UserItem from './UserItem';
import Card from '../../../shared/components/Card/Card';

const UsersList = ({ users }) => {
  if (users.length === 0) {
    return (
      <Center className="userList__noFound">
        <Card>
          <h2>No users found</h2>
        </Card>
      </Center>
    );
  }
  return (
    <ul className="userList__list">
      {users.map((user, idx) => (
        <UserItem key={idx} data={user} />
      ))}
    </ul>
  );
};

export default UsersList;
