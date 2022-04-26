import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Timesheets from "./pages/Timesheets";
import Login from "./pages/Login";
import { useState, useEffect, useContext } from "react";
import Logout from "./pages/Logout";
import Signin from "./pages/Signin";

import Projects from "./pages/Projects";
import Home from "./pages/Home";
import { AuthContext } from "./AuthProvider";
import Profile from "./pages/Profile";

function App() {
  // const [logged, setLogged] = useState(true);

  // useEffect(() => {
  //   const hasJwt = localStorage.getItem("jwt");
  //   setLogged(Boolean(hasJwt));
  // }, []);

  const { logged, setLogged } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes style={{ marginTop: "100px" }}>
        <Route element={<Home />} path="/" exact />
        {logged && (
          <Route element={<Timesheets />} path="/timesheet" exact></Route>
        )}
        {logged && <Route element="Admin Page" path="/admin" exact />}
        <Route
          element={<Login logged={logged} setLogged={setLogged} />}
          path="/login"
          exact
        ></Route>
        <Route element={<Logout />} path="/logout" exact></Route>
        <Route element={<Signin />} path="/signin" exact></Route>
        {logged && <Route element={<Projects />} path="/projects" exact />}
        <Route element={<Profile></Profile>} path="/profilePage" exact></Route>
      </Routes>
    </div>
  );
}

export default App;
