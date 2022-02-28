import './App.css';
import {
  BrowserRouter as Router,

  Route,
  BrowserRouter
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { Switch } from '@mui/material';

function App() {
  return (
    <div>

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
