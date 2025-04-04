'use client'; 
import React, {useContext, useState, useEffect } from 'react';
import { getMonth } from './utils';
import CalendarHeader from './components/calendarHeader';
import Sidebar from './components/sidebar';
import Month from './components/month';
import GlobalContext from './context/GlobalContext';
import { createClient } from '@/utils/supabase/server';
import EventModal from './components/EventModal';
import CreateEventButton from './components/CreateEventButtton';

const Calendar = () => {

 

  // TODO: FIX THIS
  // const supabase = await createClient()
  
  //   const { data, error } = await supabase.auth.getUser()
  //   if (error || !data?.user) {
  //     redirect('/login')
  //   }
  
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <React.Fragment>
    {showEventModal && <EventModal />}

    <div className="h-screen flex flex-col">
      <CalendarHeader />
      <div className="flex flex-1">
        {/* Sidebar is hidden on mobile */}
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        
        <div className="sm:hidden fixed bottom-5 right-5 z-50">
          <CreateEventButton />
        </div>

        <Month month={currenMonth} />
      </div>
    </div>
  </React.Fragment>
);
}

export default Calendar;