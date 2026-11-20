
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Catalog } from './Catalog';
import AboutTheCompany from './AboutTheCompany';

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
}

export default App;
