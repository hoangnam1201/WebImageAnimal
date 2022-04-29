
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Components/Banner';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
const LayoutHome =()=>{
  return(
    <>
      <Header/>
      <Banner/>
      <HomePage/>
    </>
  )
}
const App=()=> {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayoutHome/>}/>
      </Routes>
    </div>
  );
}

export default App;
