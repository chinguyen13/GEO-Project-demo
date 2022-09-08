import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListPage from './pages/list';
import AddPage from './pages/add';
import EditPage from './pages/edit';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/project/:code" element={<EditPage />} />
        </Routes>
    </Router>
  );
}

export default App;
