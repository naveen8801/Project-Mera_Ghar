import './App.css';
import { useEffect } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import AdminLoginPage from './pages/AdminLoginRegister/AdminLoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminProfile from './pages/AdminProfile/AdminProfile';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setAuthToken } from './utils';
import { AdminData } from './api/api';

function App() {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.admin.islogin);

  useEffect(() => {
    if (localStorage.getItem('tokken')) {
      setAuthToken(localStorage.getItem('tokken'));
      getAdminData();
    } else {
      // dispatch({
      //   type: 'SET_AUTH',
      //   isAuthenticated: false,
      // });
    }
  }, [islogin]);

  const getAdminData = async () => {
    console.log('getting admin data');
    const data = await AdminData();
    console.log(data.data);
  };

  const getAllData = () => {
    console.log('Getting all data');
  };

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/admin-profile">
          <AdminProfile />
        </Route>
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
