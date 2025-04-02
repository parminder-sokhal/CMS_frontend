import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbartop from "./containters/navbartop";
import Navbar from "./containters/Navbar";
import "./App.css";

import Dashboard from "./pages/dashboard/dashboard";


function App() {
  return (
    <Router>
      <Navbartop />
      <div className="flex h-screen overflow-hidden p-2">
        <Navbar />
        <div className="flex-1 p-4 overflow-x-auto overflow-y-auto">
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
