import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Error from "./components/common/Error";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Translate from "./components/common/Translate";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <div className="bg-black flex flex-col min-h-screen w-screen font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/error" element={<Error />} />
        <Route
          path="/create-job"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/:selection"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/:selection/:id"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Translate />
      <Footer />
    </div>
  );
}

export default App;
