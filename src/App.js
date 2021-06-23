import './App.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
     <Navbar />
      <Switch>
        <Route exact path="/profile">
          
        </Route>
        <Route exact path="/user">
          
        </Route>
        <Route exact path="/admin">
          
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
