import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  BrowserRouter
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
          <Routes>
            <Route exact path='/login' component={Login} ></Route>
            <Route exact path='/signup' component={Login} ></Route>
          </Routes>
        </BrowserRouter>
      </div >
    </Router >
  );
}


export default App;
