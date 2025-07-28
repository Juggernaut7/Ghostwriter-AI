import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Playground from './pages/Playground';
import WritingProvider from './contexts/WritingContext';
import AuthProvider from './contexts/AuthContext';
import ToastContainer from './components/ui/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <WritingProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </Router>
      </WritingProvider>
    </AuthProvider>
  );
}

export default App;