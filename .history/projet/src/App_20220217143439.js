import './App.css';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (

    <div className="App">
      <Button variant="contained">Hello World</Button>
      <Button variant="contained">Hello World</Button>
      <Button variant="contained">Hello World</Button>

      <header className="App-header">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </header>
    </div>
  );
}

export default App;