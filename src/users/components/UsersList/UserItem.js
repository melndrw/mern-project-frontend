import React from 'react';
import './UserItem.css';
import { Center, Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserItem = ({ data }) => {
  return (
    <Center>
      <Box className="user__list">
        <Image
          objectFit="cover"
          borderRadius="100%"
          boxSize={65}
          src={`http://localhost:5000/${data.image}`}
          alt={data.name}
        />
        <div className="user__content">
          <p className="user__name">
            <Link to={`/${data.id}/places`}>{data.name}</Link>
          </p>
          <p className="user__places">
            {data.places.length} {data.places.length > 1 ? 'Places' : 'Place'}
          </p>
        </div>
      </Box>
    </Center>
  );
};

export default UserItem;
