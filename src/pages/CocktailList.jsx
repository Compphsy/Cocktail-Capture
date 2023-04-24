import React, { useState } from 'react';
import PersonalCocktailTable from '../components/PersonalCocktailTable';
import GlobalCocktailTable from '../components/GlobalCocktailTable';
import '../stylesheets/cocktailList.css'
function CocktailList() {
  const [globalView, setGlobalView] = useState(false);

  const handleToggleTables = () => {
    setGlobalView(!globalView);
  }

  return (
    <div className='table-container'>
  <div className='table-container'>
  <div>
    <input type="checkbox" checked={globalView} onChange={handleToggleTables}/>
  </div>
  selected: {globalView ? 'global' : 'personal'}
  {globalView ? <GlobalCocktailTable/> : <PersonalCocktailTable/>}
</div>
</div>
  );
}

export default CocktailList;