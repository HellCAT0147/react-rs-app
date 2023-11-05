import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/page/:page" element={<App />} />
      <Route path="/" element={<Navigate to="/page/1" />} />
    </Routes>
  </BrowserRouter>
);
