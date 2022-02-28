import './App.css';
import {
  BrowserRouter,
  Router,
  Route,
  Routes
} from "react-router-dom";
import { Login } from './views/Login';
import Signup from './views/Signup';
import { ForgetPassword } from './views/ForgetPassword';

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
