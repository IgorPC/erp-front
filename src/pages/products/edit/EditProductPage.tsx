import { useParams } from "react-router-dom";
import React from 'react';

const EditProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <p>ID do Produto: {id}</p>
    </div>
  );
};

export default EditProductPage;