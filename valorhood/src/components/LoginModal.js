import React, { useState, useEffect, useRef } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonPosition, setButtonPosition] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const roamIntervalRef = useRef(null);
  const modalRef = useRef(null);
  
  // Function to show message
  const showMessage = (msg = '') => {
    setMessage(msg);
  };
  
  // Function to shift button position
  const shiftButton = () => {
    showMessage('');
    const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
    const currentIndex = positions.indexOf(buttonPosition);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % positions.length;
    setButtonPosition(positions[nextIndex]);
  };
  
  // Start button roaming
  const startRoaming = () => {
    if (!roamIntervalRef.current) {
      roamIntervalRef.current = setInterval(shiftButton, 1000);
    }
  };
  
  // Stop button roaming
  const stopRoaming = () => {
    if (roamIntervalRef.current) {
      clearInterval(roamIntervalRef.current);
      roamIntervalRef.current = null;
      setButtonPosition('');
    }
  };
  
  // Validate form
  const validateForm = () => {
    const isValid = username.trim().length >= 3 && password.trim().length >= 6;
    setIsButtonDisabled(!isValid);
    
    showMessage(isValid ? '' : 'Username must be 3+ characters, password 6+ characters.');
    
    if (isValid) {
      stopRoaming();
    } else if (!isUsernameFocused && !isPasswordFocused) {
      startRoaming();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      showMessage('Access granted!');
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };
  
  // Handle click outside modal
  const handleOutsideClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };
  
  // Effect for starting/stopping roaming when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      validateForm();
    } else {
      stopRoaming();
      setUsername('');
      setPassword('');
      setIsButtonDisabled(true);
      setIsUsernameFocused(false);
      setIsPasswordFocused(false);
      showMessage('');
    }
    
    return () => {
      stopRoaming();
    };
  }, [isOpen]);
  
  // Effect for validating form when inputs change
  useEffect(() => {
    validateForm();
  }, [username, password]);
  
  return (
    <div 
      ref={modalRef}
      className={`modal ${!isOpen ? 'hidden' : ''}`}
      onClick={handleOutsideClick}
    >
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>×</span>
        <h2>VALORHOOD</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="uname">Username</label>
            <input 
              type="text" 
              id="uname" 
              placeholder="Enter username" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => {
                setIsUsernameFocused(true);
                stopRoaming();
              }}
              onBlur={() => {
                setIsUsernameFocused(false);
                validateForm();
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input 
              type="password" 
              id="pass" 
              placeholder="Enter password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                setIsPasswordFocused(true);
                stopRoaming();
              }}
              onBlur={() => {
                setIsPasswordFocused(false);
                validateForm();
              }}
            />
          </div>
          <div className="btn-container">
            <button 
              type="submit" 
              className={`login-btn ${buttonPosition}`}
              disabled={isButtonDisabled}
            >
              Enter
            </button>
          </div>
          <div className="msg">{message}</div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
