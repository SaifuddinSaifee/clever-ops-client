import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { Integrations } from './pages/Integrations';
import { Team } from './pages/Team';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;