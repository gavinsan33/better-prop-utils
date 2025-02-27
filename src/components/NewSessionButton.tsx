import React, { useState } from 'react';
import { createNewSession } from '../services/indexedDB';
import Button from './Button';

interface NewSessionButtonProps {
  className?: string;
  onNewSession?: () => void;
}

const NewSessionButton: React.FC<NewSessionButtonProps> = ({ className, onNewSession }) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleNewSession = async () => {
    try {
      setIsCreating(true);
      await createNewSession();
      
      // Optional callback for parent components
      if (onNewSession) {
        onNewSession();
      }
      
      // Show success feedback
      alert('New session created successfully!');
    } catch (error) {
      console.error('Error creating new session:', error);
      alert('Error creating new session. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button 
      onClick={handleNewSession} 
      color="yellow" 
      className={`font-semibold ${className} ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isCreating}
    >
      {isCreating ? 'CREATING...' : 'NEW SESSION'}
    </Button>
  );
};

export default NewSessionButton;
