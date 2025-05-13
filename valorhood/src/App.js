import React, { useState } from 'react';
import './App.css';
import LoginModal from './components/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="app-container">
      <h1>VALORHOOD</h1>
      <button className="open-modal-btn" onClick={openModal}>Access Portal</button>
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default App;
