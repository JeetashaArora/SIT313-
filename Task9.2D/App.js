import logo from './logo.svg';
import './App.css';
import app from "./utils/firebase"
import Signup from './routes/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login'
import Homepage from './Homepage';
import Navbar from './Navbar';
import Navigation from './Navigation';
import Code from './Code';
import Success from './Success';
import WelcomePage from './WelcomePage';


function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Navigation />}>

          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<WelcomePage/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/code' element={<Code />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/success' element={<Success />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
