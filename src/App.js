import './App.css';
import { useEffect } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import AdminLoginPage from './pages/AdminLoginRegister/AdminLoginPage';
import socketIOClient, { io } from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:5000';

function App() {
  const socket = socketIOClient(ENDPOINT, {
    transports: ['websocket', 'polling', 'flashsocket'],
  });
  useEffect(() => {
    socket.on('Public-Data-Fetched', (data) => {
      console.log(data);
    });
  }, []);
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
