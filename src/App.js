import "./App.css";
import Navbar from "./NavBar";
import Login from './Login';
import CryptoDetail from './CryptoDetail';
import Register from "./Register";
import Home from "./Home"
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path=":coin" element={<CryptoDetail />} />
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </div>
  );
}
 
export default App;

