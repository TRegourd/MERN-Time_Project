import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Timesheets from "./pages/Timesheets";
import Login from "./pages/Login";
import { useContext } from "react";
import Signin from "./pages/Signin";

import Projects from "./pages/Projects";
import Home from "./pages/Home";
import { AuthContext, AuthContextType } from "./AuthProvider";
import Profile from "./pages/Profile";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Teams from "./pages/Teams";
import InvitiationSignIn from "./pages/InvitationSignIn";

const App = () => {
  const { logged } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Signin />} path="/signin"></Route>
        <Route element={<InvitiationSignIn />} path="/invitation/:id"></Route>
        <Route element={<Forgot />} path="/forgot"></Route>
        <Route element={<Reset />} path="/reset/:id" />
        {logged && <Route element={<Timesheets />} path="/timesheet"></Route>}
        {logged && <Route element={<Projects />} path="/projects" />}
        {logged && <Route element={<Dashboard />} path="/dashboard" />}
        {logged && <Route element={<Report />} path="/report" />}
        {logged && <Route element={<Teams />} path="/teams" />}
        <Route element={<Profile></Profile>} path="/profilePage"></Route>
      </Routes>
    </div>
  );
};

export default App;
