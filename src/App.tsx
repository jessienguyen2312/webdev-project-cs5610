import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import Home from "./Bookazon/Home";
import Profile from "./Bookazon/Profile";
import Navigation from "./Bookazon/Navigation";
import SignIn from "./Bookazon/SignIn";
import SignUp from "./Bookazon/SignUp";

function App() {
  return (
    <div>
        <HashRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="Bookazon/Home/"/>} />
                <Route path="Bookazon/Home" element={<Home/>}/>
                <Route path="Bookazon/Profile" element={<Profile/>}/>
                <Route path="Bookazon/SignIn" element={<SignIn/>}/>
                <Route path="Bookazon/SignUp" element={<SignUp/>}/>
            </Routes>
        </HashRouter>
    </div>

  );
}

export default App;
