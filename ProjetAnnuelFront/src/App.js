import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Login } from './views/Login';
import Signup from './views/Signup';
import SignupPro from './views/pro/SignupPro';
import Home from './views/Home';
import { ForgetPassword } from './views/ForgetPassword';
import { Faq } from './views/Faq';
import { Quisommesnous } from './views/Quisommesnous';
import Footer from './components/Footer';
import Header from './components/Header';
import { Recrutement } from './views/Recrutement';
import { ServicesPro } from './views/ServicesPro';
import { Moncompte } from './views/Moncompte';
import { Contact } from './views/Contact';
import { NotFoundPage } from '../src/components/NotFoundPage';
import { Professionnels } from '../src/components/admin/Professionnels';
import { ModifPassword } from './views/ModifPassword';
import PrivateRoute from './route/PrivateRoute';
import Logout from '../src/components/Logout';
import { Services } from './views/Services';
import { Reservation } from './views/client/Reservation';
import Dashboard from './views/admin/Dashboard';

export const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className='heighpage'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/pro/create' element={<SignupPro />} />
          <Route exact path='/logout' element={<Logout />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/moncompte' element={<PrivateRoute Component={Moncompte} />} />
          <Route exact path='/faq' element={<Faq />} />
          <Route exact path='/reservation' element={<Reservation />} />
          <Route exact path='/recrutement' element={<Recrutement />} />
          <Route exact path='/pro/services' element={<ServicesPro />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/modifPassword' element={<ModifPassword />} />
          <Route exact path='/qui-sommes-nous' element={<Quisommesnous />} />
          <Route exact path='/error404' element={<NotFoundPage />} />
          <Route exact path='/forgetpassword' element={<ForgetPassword />} />

          {/* ADMIN */}
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/pro' element={<Professionnels />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
