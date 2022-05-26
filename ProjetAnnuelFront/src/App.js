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
import { Parents } from './components/admin/Parents';
import { Professionnel } from './components/admin/Professionnel';
import { Parent } from './components/admin/Parent';
import { Disponible } from './views/pro/Disponible';
import { Donation } from './views/paiement/Donation';
import AuthProvider from './components/contexts/AuthContext';
import { roles } from './constants/roles';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className='heighpage'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/pro/create' element={<SignupPro />} />
            <Route exact path='/logout' element={<Logout />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/faq' element={<Faq />} />
            <Route exact path='/recrutement' element={<Recrutement />} />
            <Route exact path='/services' element={<Services />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/modifPassword' element={<ModifPassword />} />
            <Route exact path='/qui-sommes-nous' element={<Quisommesnous />} />
            <Route exact path='/forgetpassword' element={<ForgetPassword />} />
            <Route exact path='/donation' element={<Donation />} />

            {/* Page PARENT */}
            <Route exact path='/reservation' element={<PrivateRoute restricted={roles.PARENT} Component={Reservation} />} />
            <Route exact path='/moncompte' element={<PrivateRoute restricted={roles.PARENT} Component={Moncompte} />} />

            {/* Page PRO */}
            <Route exact path='/pro/services' element={<PrivateRoute restricted={roles.PRO} Component={ServicesPro} />} />
            <Route exact path='/pro/disponible' element={<PrivateRoute restricted={roles.PRO} Component={Disponible} />} />

            {/* ADMIN DASHBOARD */}
            <Route exact path='/dashboard' element={<PrivateRoute restricted={roles.ADMIN} Component={Dashboard} />} />
            <Route exact path='/pro' element={<PrivateRoute restricted={roles.ADMIN} Component={Professionnels} />} />
            <Route exact path='/parent' element={<PrivateRoute restricted={roles.ADMIN} Component={Parents} />} />
            <Route exact path='/pro/:id' element={<PrivateRoute restricted={roles.ADMIN} Component={Professionnel} />} />
            <Route exact path='/parent/:id' element={<PrivateRoute restricted={roles.ADMIN} Component={Parent} />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
