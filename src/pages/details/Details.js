import React from 'react';
import { useParams } from 'react-router';

const Details = () => {
  const { id } = useParams();
  return <div>Details for {id}</div>;
};

export default Details;
