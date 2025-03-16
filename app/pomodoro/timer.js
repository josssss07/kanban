import React, { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
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
            
            // Show signup prompt when reaching 50 minutes (3000 seconds) and not previously dismissed
            if (newTotal % 3000 === 0 && !promptDismissed) {
              setShowPrompt(true);
              setIsRunning(false);
            }
            
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
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 text-white relative">
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/api/placeholder/400/320" preload="auto" />
      
      {/* Sign-up prompt overlay */}
      {showPrompt && (
        <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full border border-purple-500">
            <h3 className="text-xl font-bold text-purple-400 mb-2">
              Enjoying your productivity?
            </h3>
            <p className="mb-4 text-gray-300">
              You've been using the timer for 50 minutes! Sign up now to unlock premium features:
            </p>
            <ul className="mb-6 text-gray-300 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Custom sound alerts
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Project tracking
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Detailed statistics
              </li>
            </ul>
            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium transition-colors"
                onClick={() => window.location.href = '/login'}
              >
                Sign Up
              </button>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors text-sm"
                  onClick={handleDismissPrompt}
                >
                  Later
                </button>
                <button
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors text-sm"
                  onClick={handleDismissForever}
                >
                  Don't Show Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
      
      {/* Free version indicator */}
      <div className="mt-4 pt-3 border-t border-gray-700 text-center text-gray-400 text-sm">
        Love using This ? <br></br>Login to access more features • <a href="/Login" className="text-purple-400 hover:text-purple-300">Login</a>
      </div>
    </div>
  );
};

export default PomodoroTimer;