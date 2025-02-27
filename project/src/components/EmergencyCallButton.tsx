import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const EmergencyCallButton = () => {
  const [calling, setCalling] = useState(false);
  
  const handleEmergencyCall = () => {
    setCalling(true);
    
    // Simulate call connection
    setTimeout(() => {
      alert('Emergency services have been notified. A doctor will contact you shortly.');
      setCalling(false);
    }, 2000);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleEmergencyCall}
        disabled={calling}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg text-white font-bold transition-all transform hover:scale-105 ${
          calling ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 animate-pulse'
        }`}
      >
        <Phone className="h-5 w-5" />
        <span>{calling ? 'Connecting...' : 'Emergency Call'}</span>
      </button>
    </div>
  );
};

export default EmergencyCallButton;