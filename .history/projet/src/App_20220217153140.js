import './App.css';
import {
  BrowserRouter as Router,

  Link,
  Route,
  BrowserRouter
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { Switch } from '@mui/material';

function App() {
  return (
    <Router>
      <div>
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
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Login} />
            console.log("test")
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </BrowserRouter>
      </div >
    </Router >
  );
}


export default App;
