import "./App.css";
import Navbar from "./NavBar";
import Login from './Login';
import CryptoDetail from './CryptoDetail';
import Home from "./Home"
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path=":coin" element={<CryptoDetail />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;

