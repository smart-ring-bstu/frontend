import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AboutTheCompany from "./AboutTheCompany";
import {Catalog} from "./Catalog";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<AboutTheCompany />} />
      </Routes>
    </BrowserRouter>
  );
  {/*<AboutTheCompany />*/};
}

export default App;
