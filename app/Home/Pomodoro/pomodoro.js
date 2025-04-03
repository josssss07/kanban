"use client";
import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {

  {/* Background grid pattern - fixed to be behind content */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="400" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="purple" strokeWidth="0.5" strokeOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
  // Timer states
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  
  // Refs for audio
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  
  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            audioRef.current?.play();
            
            // Switch between work and break
            const newIsBreak = !isBreak;
            setIsBreak(newIsBreak);
            
            // If switching from break to work, increment sessions
            if (newIsBreak === false) {
              setSessions(s => s + 1);
            }
            
            // Set new time based on mode
            return newIsBreak ? breakTime * 60 : workTime * 60;
          }
          return prev - 1;
        });
        
        // Track total time spent (only during work sessions)
        if (!isBreak) {
          setTotalTimeSpent(prev => {
            const newTotal = prev + 1;
            return newTotal;
          });
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isBreak, workTime, breakTime, promptDismissed]);
  
  // Reset timer when work/break time changes
  useEffect(() => {
    setTimeLeft(isBreak ? breakTime * 60 : workTime * 60);
  }, [workTime, breakTime, isBreak]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format total time in hours and minutes
  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };
  
  // Handle start/pause
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };
  
  // Handle reset
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
  };
  
  // Skip to next session
  const skipSession = () => {
    setIsRunning(false);
    setIsBreak(prev => !prev);
    setTimeLeft(isBreak ? workTime * 60 : breakTime * 60);
  };
  
  // Dismiss prompt
  const handleDismissPrompt = () => {
    setShowPrompt(false);
  };
  
  // Dismiss prompt and don't show again
  const handleDismissForever = () => {
    setShowPrompt(false);
    setPromptDismissed(true);
  };
  
  return (
    <div className='flex h-screen items-center justify-center'> 
    <div className="max-w-md w-full mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6  text-white relative">
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/api/placeholder/400/320" preload="auto" />

      {/* Background grid pattern - fixed to be behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="purple" strokeWidth="0.5" strokeOpacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">
          {isBreak ? 'Break Time' : 'Work Time'}
        </h2>
        
        {/* Task name input */}
        <div className="mb-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="What are you working on?"
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-center"
          />
        </div>
        
        {/* Timer display */}
        <div className="text-6xl font-bold my-6 font-mono">
          {formatTime(timeLeft)}
        </div>
        
        {/* Timer controls */}
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={toggleTimer}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-medium flex-1 max-w-32"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            Reset
          </button>
          <button
            onClick={skipSession}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium"
          >
            Skip
          </button>
        </div>
      </div>
      
      {/* Timer settings */}
      <div className="bg-gray-700 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-medium mb-3">Timer Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Work Time (min)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workTime}
              onChange={(e) => setWorkTime(parseInt(e.target.value) || 1)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              disabled={isRunning}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Break Time (min)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakTime}
              onChange={(e) => setBreakTime(parseInt(e.target.value) || 1)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              disabled={isRunning}
            />
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Statistics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-400">Total Time</div>
            <div className="text-xl font-bold">{formatTotalTime(totalTimeSpent)}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-400">Sessions</div>
            <div className="text-xl font-bold">{sessions}</div>
          </div>
        </div>
      </div>
      
      
    </div>
    </div>
  );
};

export default PomodoroTimer;