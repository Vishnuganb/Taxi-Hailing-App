import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DriverLayout from './layouts/DriverLayout';
import Home from './views/public/Home';
import Login from './views/auth/Login';
import DriverRegister from './views/auth/DriverRegister';
import DriverHome from './views/driver/DriverHome';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout public={true} page={<Home/>}/> }/>
          <Route path='/login' element={<MainLayout public={true} page={<Login/>}/> }/>
          <Route path='/driverRegister' element={<MainLayout public={true} page={<DriverRegister/>}/> }/>
          <Route path='/driver' element={<DriverLayout public={false} page={<DriverHome/>}/>} />
        </Routes>
      </Router>
  );
}

export default App;
