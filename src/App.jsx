import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./redux/actions/authAction";
import { isTokenValid } from "./utils/tokenUtils"; // 🔥 Create this if you haven’t
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Navbartop from "./containters/navbartop";
import Navbar from "./containters/Navbar";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/contactus";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AddEmployee from "./pages/addEmployee";
import EmployeeList from "./pages/EmployeeList";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbartop />
      <div className="flex h-screen overflow-hidden p-2">
        <Navbar />
        <div className="flex-1 p-4 overflow-x-auto overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/addEmployee" element={<AddEmployee />} />
              <Route path="/EmployeeList" element={<EmployeeList />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
