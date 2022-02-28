import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Login } from './views/Login';
import Signup from './views/Signup';
import { ForgetPassword } from './views/ForgetPassword';
import Footer from './components/Footer';
import Footer from './components/Footer';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/forgetpassword' element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />


    </div >
  );
}
