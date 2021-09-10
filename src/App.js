import './App.css';
import { useEffect } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import AdminLoginPage from './pages/AdminLoginRegister/AdminLoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/profile"></Route>
        <Route exact path="/admin">
          <AdminLoginPage />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
