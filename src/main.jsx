import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
      <Toaster />
    </UserContextProvider>
  </BrowserRouter>
);
