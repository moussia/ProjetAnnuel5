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
import AccountMenu from './components/AccountMenu';

export const App = () => {
  return (
    <div>
      <AccountMenu />

      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
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
