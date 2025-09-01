import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TCGShopHomepage from './components/TCGShopHomepage/TCGShopHomepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TCGShopHomepage />}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
