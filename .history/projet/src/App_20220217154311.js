import './App.css';
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { Switch } from '@mui/material';

function App() {
  return (
    <div>
      <Route>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </Route>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Login} />
          console.log("test")
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}


export default App;
