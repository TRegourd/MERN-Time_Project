import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Timesheets from "./pages/Timesheets";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import Logout from "./pages/Logout";

function App() {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    console.log(logged);
    setLogged(logged == "true");
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar logged={logged} setLogged={setLogged}></Navbar>

        <Routes>
          <Route element="Home page" path="/" exact />
          <Route element={<Timesheets />} path="/timesheet" exact></Route>
          <Route element="Users Page" path="/users" exact />
          <Route element="Projects Page" path="/projects" exact />
          <Route
            element={<Login logged={logged} setLogged={setLogged} />}
            path="/login"
            exact
          ></Route>
          <Route element={<Logout />} path="/logout" exact></Route>
          <Route element="Signin Page" path="/signin" exact></Route>
          <Route element="Profile Page" path="/profilePage" exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
