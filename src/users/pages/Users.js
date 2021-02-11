import React from 'react';
import UsersList from '../components/UsersList/UsersList';
import Map from '../../shared/components/UIElements/Map/Map';

const Users = () => {
  const users = [
    {
      id: 1,
      name: 'Jose P. Rizal',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/b/b0/Jose_rizal_01.jpg',
      places: 2,
    },
    {
      id: 2,
      name: 'Andres Bonifacio',
      image:
        'https://2.bp.blogspot.com/-vTyuZE_o_nU/W4wGvt6In3I/AAAAAAAAECw/UYptjux-r1gkst50tbfw8eY07mg6N7_xQCLcBGAs/s1600/Andres%2BBonifacio.JPG',
      places: 1,
    },
  ];
  return (
    <>
      <UsersList users={users} />
    </>
  );
};

export default Users;
