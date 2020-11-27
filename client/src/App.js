import React, {useEffect, useState} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import { Header } from './components/views/header/header'
import Main from './components/views/main/main'
import { Login } from './components/views/login/login'
import { Register } from './components/views/register/register'

function App() {

  const [headerAnimation, setHeaderAnimation] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const headerH = document.getElementById("header").clientHeight;
      if(window.scrollY > headerH * 1.5){
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
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
