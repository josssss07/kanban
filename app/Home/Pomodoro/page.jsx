import React from 'react'
import PomodoroTimer from './pomodoro'
const PomodoroPage = () => {
  return (
    <div className='w-full px-4 md:px-6 py-4 flex justify-center items-center min-h-screen'>
      <div className='w-full max-w-md mx-auto'>
        <PomodoroTimer />
      </div>
    </div>
  )
}

export default PomodoroPage