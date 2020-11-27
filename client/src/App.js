import React from 'react';
import './App.css';
import LoginPage from './components/views/loginPage/loginPage';
import RegisterPage from './components/views/registerPage/registerPage'
import {Switch, Route} from 'react-router-dom';
import Header from './components/views/header/header'
import LandingPage from './components/views/landingPage/landingPage';
import UploadPage from './components/views/uploadPage/uploadPage';
import List from './components/views/list/list'
import DetailPage from './components/views/detailPage/detailPage';
function App() {
  return (
    <div className="App">
      <Header />
      <div className="contents">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/upload" component={UploadPage} />
        <Route exact path="/teams" component={List} />
        <Route exact path="/team/:teamId" component={DetailPage} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
