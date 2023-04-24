import {React } from 'react'
import { useParams } from 'react-router-dom';
import CocktailDashboard from '../components/CocktailDashboard';
function ViewCocktail() {
  const {myKey} = useParams();
    return <CocktailDashboard id={myKey} />;
}

export default ViewCocktail