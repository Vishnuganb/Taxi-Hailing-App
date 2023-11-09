import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PassengerLayout from './layouts/PassengerLayout';
import Home from './views/public/Home';
import Login from './views/auth/Login';
import PassengerRegister from './views/auth/PassengerRegister';
import PassengerHome from './views/Passanger/PassengerHome';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout public={true} page={<Home/>}/> }/>
          <Route path='/login' element={<MainLayout public={true} page={<Login/>}/> }/>
          <Route path='/passengerRegister' element={<MainLayout public={true} page={<PassengerRegister/>}/> }/>
          <Route path='/passenger' element={<PassengerLayout public={false} page={<PassengerHome/>}/>} />
        </Routes>
      </Router>
  );
}

export default App;
