import React, {useEffect, useState} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Auth from '../hoc/auth'
import { Header } from './views/header/header'
import Main from './views/main/main'
import { Login } from './views/login/login'
import { Register } from './views/register/register'
import UploadForm from './views/uploadForm/uploadForm'
import Landing from './views/main/sections/landing'
function App() {


  return (
    <div className="App">
      <Header/>
      <div className="contents">
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)}/>
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(UploadForm, true)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
