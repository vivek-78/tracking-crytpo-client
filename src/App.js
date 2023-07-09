import CryptoTable from './CryptoTable';
import "./App.css";
import Navbar from "./NavBar";
import CryptoDetail from './CryptoDetail';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<CryptoTable />} />
            <Route path=":coin" element={<CryptoDetail />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;

