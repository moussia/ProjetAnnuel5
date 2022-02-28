import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  BrowserRouter
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

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
          <Routes>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Login} />
            console.log("test")
            <Route exact path='/signup' component={Signup} />
          </Routes>
        </BrowserRouter>
      </div >
    </Router >
  );
}


export default App;
