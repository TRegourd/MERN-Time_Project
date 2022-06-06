import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Timesheets from "./pages/Timesheets";
import Login from "./pages/Login";
import { useState, useEffect, useContext, FC } from "react";
import Logout from "./pages/Logout";
import Signin from "./pages/Signin";

import Projects from "./pages/Projects";
import Home from "./pages/Home";
import { AuthContext, AuthContextType } from "./AuthProvider";
import Profile from "./pages/Profile";

const App = () => {
  const { logged } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route element={<Home />} path="/" />
        {logged && <Route element={<Timesheets />} path="/timesheet"></Route>}
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Logout />} path="/logout"></Route>
        <Route element={<Signin />} path="/signin"></Route>
        {logged && <Route element={<Projects />} path="/projects" />}
        <Route element={<Profile></Profile>} path="/profilePage"></Route>
      </Routes>
    </div>
  );
};

export default App;
