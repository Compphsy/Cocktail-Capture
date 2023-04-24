import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CocktailList from './pages/CocktailList';
import AddCocktail from './pages/AddCocktail';
import Home from './pages/Home';
import ViewCocktail from './pages/ViewCocktail';
import EditCocktail from './pages/EditCocktail';
function App() {
  return ( 
    <Router>
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/Add" element={<AddCocktail/>}></Route>
    <Route path="/View" element={<CocktailList/>}></Route>
    <Route path="/cocktail/:myKey" element={<ViewCocktail/>}></Route>
    <Route path="/edit/:myKey" element={<EditCocktail/>}></Route>
    </Routes>
    </Router>
    )
}

export default App;