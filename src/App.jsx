import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Footer from "./components/ui/common/Footer";

function App() {
  return (
    <div className="bg-black h-screen w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
