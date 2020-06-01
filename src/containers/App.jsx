import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import LoginPage from '../pages/login';
import RegistrationPage from '../pages/registration';
import { AuthContext } from '../store/AuthProvider';
import Header from '../components/Header/Header';
import EditForm from '../components/EditForm/EditForm';
import EmpPage from '../pages/emp';
import DeptPage from '../pages/dept';

function App() {
  const { authenticated } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/emp" render={(props) => !authenticated ? <Redirect to="/login" /> : <EmpPage {...props} />} />
          <Route exact path="/dept" render={(props) => !authenticated ? <Redirect to="/login" /> : <DeptPage {...props} />} />
          <Route exact path="/registration" render={(props) => authenticated ? <Redirect to="/emp" /> : <RegistrationPage {...props} />} />
          <Route exact path="/login" render={(props) => authenticated ? <Redirect to="/emp" /> : <LoginPage {...props} />} />
          <Route exact path="/:table/add" render={(props) => <EditForm {...props} />} />
          <Route exact path="/" render={(props) => <Redirect to="/emp" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
