import {React } from 'react'
import { useParams } from 'react-router-dom';
import EditACocktail from '../components/EditACocktail';

function ViewCocktail() {
  const { myKey } = useParams();
  return(
    <div>
    <h1>Edit Cocktail Form</h1>
  <EditACocktail id={myKey} />
  </div>
  );
}

export default ViewCocktail