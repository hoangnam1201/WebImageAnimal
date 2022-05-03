
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Components/Banner';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
const LayoutHome =()=>{
  return(
    <>
      <Header/>
      <Banner/>
      <HomePage/>
      <Footer/>
    </>
  )
}
const LayoutAuth = ()=>{
  return(
    <>
    <Header/>
    <Outlet/>
    </>
  )
}
const App=()=> {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayoutHome/>}/>
        <Route path='/auth' element={<LayoutAuth/>}>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
