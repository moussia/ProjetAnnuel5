import './App.css';
import {
  BrowserRouter,
  Link,
  Router,
  Route,
  Routes
} from "react-router-dom";
import {Login} from './views/Login';
import Signup from './views/Signup';

export const App = () => {
  console.log("coco")
  return (

    <div>
     
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
