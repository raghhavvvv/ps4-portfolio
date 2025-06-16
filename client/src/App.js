import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BootUpScreen from './components/BootUpScreen';
import HomeScreen from './components/HomeScreen';
import ProfilePage from './components/ProfilePage'; // We will create this next

function App() {
  const [booting, setBooting] = useState(true);

  if (booting) {
    return <BootUpScreen onFinished={() => setBooting(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;