import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';

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
<
          <​Switch​>
            <​PublicRoute exact path='/login' component={Login} />
            <​PublicRoute exact path='/signup' component={Signup} />
            <​PublicRoute exact path='/activation' component={Activate} />
            <​/​Switch​>
        </BrowserRouter>


        {/* <Routes>
          <Route path="/">
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
          </Route>
        </Routes> */}

      </div >
    </Router >
  );
}


export default App;
