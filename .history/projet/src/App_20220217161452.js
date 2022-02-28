import './App.css';
import {
  BrowserRouter,
  Link,
  Router,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { Switch } from '@mui/material';

function App() {
  console.log("coco")
  return (

    <div>
      <Router>
        <nav>
          <ul>
            <li>

              <Link to="/" component={Login} ></Link>
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
      </Router >
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </BrowserRouter>
    </div >
  );
}


export default App;
