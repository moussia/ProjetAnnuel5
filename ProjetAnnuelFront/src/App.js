import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import * as React from 'react';
import { Login } from './views/Login';
import Signup from './views/Signup';
import SignupPro from './views/pro/SignupPro';
import Home from './views/Home';
import { ForgetPassword } from './views/ForgetPassword';
import { Faq } from './views/Faq';
import { Quisommesnous } from './views/Quisommesnous';
import Footer from './components/Footer';
import Header from './components/header/Header';
import { Recrutement } from './views/Recrutement';
import { ServicesPro } from './views/ServicesPro';
import { Moncompte } from './views/Moncompte';
import { Contact } from './views/Contact';
import { NotFoundPage } from '../src/components/NotFoundPage';
import { Professionnels } from '../src/components/admin/Professionnels';
import { ModifPassword } from './views/ModifPassword';
import { PrivateRoute } from './route/PrivateRoute';
import Logout from '../src/components/Logout';
import { Services } from './views/Services';
import { Aide } from './views/client/Aide';
import Dashboard from './views/admin/Dashboard';
import { Parents } from './components/admin/Parents';
import { Professionnel } from './components/admin/Professionnel';
import { Parent } from './components/admin/Parent';
import { Disponible } from './views/pro/Disponible';
import AuthProvider from './components/contexts/AuthContext';
import { roles } from './constants/roles';
import { NewPassword } from './views/NewPassword';
import { Demande } from "./views/pro/Demande";
import { ActivateMail } from './views/ActivateMail';
import './App.css';
import Chat from "./views/chat/Chat";
import { Historique } from "./views/client/Historique";
import { HistoriquePro } from "./views/pro/Historique";
import Payment from "./components/payment/Payment";
import Deposits from "./components/admin/Deposits";
import { Dons } from "./components/admin/Dons";
import { Demandes } from "./components/admin/Demandes";
// import { ListItems } from "./components/admin/drower/ListItems";


export const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        {/* <ListItems /> */}
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
            <Route exact path='/activatedMail' element={<ActivateMail />} />
            <Route exact path='/newPassword' element={<NewPassword />} />
            <Route exact path='/qui-sommes-nous' element={<Quisommesnous />} />
            <Route exact path='/forgetpassword' element={<ForgetPassword />} />


            {/* CHAT */}
            <Route exact path='/chat' element={<PrivateRoute Component={Chat} />} />


            {/* Page PARENT */}
            <Route exact path='/aide' element={<PrivateRoute restricted={roles.PARENT} Component={Aide} />} />
            <Route exact path='/moncompte' element={<PrivateRoute restricted={roles.PARENT} Component={Moncompte} />} />
            <Route exact path='/historique' element={<PrivateRoute restricted={roles.PARENT} Component={Historique} />} />
            <Route exact path='/payment' element={<PrivateRoute restricted={roles.PARENT} Component={Payment} />} />

            {/* Page PRO */}
            <Route exact path='/pro/services' element={<PrivateRoute restricted={roles.PRO} Component={ServicesPro} />} />
            <Route exact path='/pro/disponible' element={<PrivateRoute restricted={roles.PRO} Component={Disponible} />} />
            <Route exact path='/pro/demande' element={<PrivateRoute restricted={roles.PRO} Component={Demande} />} />
            <Route exact path='/pro/historique' element={<PrivateRoute restricted={roles.PRO} Component={HistoriquePro} />} />

            {/* ADMIN DASHBOARD */}
            {/* <Route exact path='/dashboard' element={<PrivateRoute restricted={roles.ADMIN} Component={Dashboard} />} /> */}
            <Route exact path='/dashboard' element={<PrivateRoute restricted={roles.ADMIN} Component={Dashboard} />} />
            <Route exact path='/don' element={<PrivateRoute restricted={roles.ADMIN} Component={Deposits} />} />
            <Route exact path='/demandes' element={<PrivateRoute restricted={roles.ADMIN} Component={Demandes} />} />
            <Route exact path='/pro' element={<PrivateRoute restricted={roles.ADMIN} Component={Professionnels} />} />
            <Route exact path='/parents' element={<PrivateRoute restricted={roles.ADMIN} Component={Parents} />} />
            <Route exact path='/pro/:id' element={<PrivateRoute restricted={roles.ADMIN} Component={Professionnel} />} />
            <Route exact path='/parent/:id' element={<PrivateRoute restricted={roles.ADMIN} Component={Parent} />} />
            <Route exact path='/donation' element={<PrivateRoute restricted={roles.ADMIN} Component={Dons} />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
