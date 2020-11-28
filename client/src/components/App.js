import React, {useEffect, useState} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Auth from '../hoc/auth'
import { Header } from './views/header/header'
import Main from './views/main/main'
import { Login } from './views/login/login'
import { Register } from './views/register/register'
import UploadForm from './views/uploadForm/uploadForm'
function App() {

  const [headerAnimation, setHeaderAnimation] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const headerH = document.getElementById("header").clientHeight;
      if(window.scrollY > headerH){
        setHeaderAnimation(true);
      } else {
        setHeaderAnimation(false);
      }
    })
  })

  return (
    <div className="App">
      <Header animation={headerAnimation}/>
      <div className="contents">
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/login" component={Auth(Login, false)}/>
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(UploadForm, true)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
