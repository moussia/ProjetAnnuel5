import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Login } from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import { ForgetPassword } from './views/ForgetPassword';
import { Faq } from './views/Faq';
import { Quisommesnous } from './views/Quisommesnous';
import Footer from './components/Footer';
import Header from './components/Header';
import { Recrutement } from './views/Recrutement';
import { Services } from './views/services';
import { Moncompte } from './views/Moncompte';
import { Contact } from './views/Contact';
import { ModifPassword } from './views/ModifPassword';



export const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className='heighpage'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/moncompte' element={<Moncompte />} />
          <Route exact path='/faq' element={<Faq />} />
          <Route exact path='/recrutement' element={<Recrutement />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/modifPassword' element={<ModifPassword />} />
          <Route exact path='/qui-sommes-nous' element={<Quisommesnous />} />
          <Route exact path='/forgetpassword' element={<ForgetPassword />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
