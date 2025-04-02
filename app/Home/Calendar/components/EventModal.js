import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { Calendar1Icon, X, Trash2, Clock, RefreshCw } from "lucide-react";
import { gapi } from "gapi-script";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar";

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : "12:00"
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : "13:00"
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  function addToGoogleCalendar(event) {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      }).then((response) => {
        console.log("Event added to Google Calendar:", response);
      }).catch((error) => {
        console.error("Error adding event to Google Calendar:", error);
      });
    });
  }

  function fetchGoogleCalendarEvents() {
    setIsFetching(true);
    
    const auth2 = gapi.auth2.getAuthInstance();
    if (!auth2.isSignedIn.get()) {
      auth2.signIn().then(() => {
        getEvents();
      }).catch((error) => {
        console.error("Error signing in:", error);
        setIsFetching(false);
      });
    } else {
      getEvents();
    }
    
    function getEvents() {
      // Get the start and end of the selected day
      const startDate = daySelected.format("YYYY-MM-DD") + "T00:00:00Z";
      const endDate = daySelected.format("YYYY-MM-DD") + "T23:59:59Z";
      
      gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate,
        timeMax: endDate,
        singleEvents: true,
        orderBy: 'startTime'
      }).then((response) => {
        const events = response.result.items;
        console.log("Fetched events:", events);
        
        // Add each Google Calendar event to our app's calendar
        events.forEach(event => {
          // Extract just the time portion from the datetime
          const startDateTime = new Date(event.start.dateTime || event.start.date);
          const endDateTime = new Date(event.end.dateTime || event.end.date);
          
          const startTimeStr = startDateTime.toTimeString().substring(0, 5);
          const endTimeStr = endDateTime.toTimeString().substring(0, 5);
          
          // Map Google Calendar events to our app's format
          const calendarEvent = {
            title: event.summary,
            description: event.description || "",
            label: getRandomLabel(), // Assign a random label or implement logic to map Google Calendar colors
            day: daySelected.valueOf(),
            startTime: startTimeStr,
            endTime: endTimeStr,
            id: event.id,
            googleEvent: true // Flag to identify this event came from Google Calendar
          };
          
          dispatchCalEvent({
            type: "push",
            payload: calendarEvent,
          });
        });
        
        setIsFetching(false);
      }).catch((error) => {
        console.error("Error fetching events from Google Calendar:", error);
        setIsFetching(false);
      });
    }
  }
  
  function getRandomLabel() {
    // Simple function to assign a random label class from our available classes
    return labelsClasses[Math.floor(Math.random() * labelsClasses.length)];
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eventDate = daySelected.format("YYYY-MM-DD");
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      startTime,
      endTime,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    dispatchCalEvent({
      type: selectedEvent ? "update" : "push",
      payload: calendarEvent,
    });

    const googleEvent = {
      summary: title,
      description,
      start: {
        dateTime: `${eventDate}T${startTime}:00`,
        timeZone: "UTC",
      },
      end: {
        dateTime: `${eventDate}T${endTime}:00`,
        timeZone: "UTC",
      },
    };
    addToGoogleCalendar(googleEvent);

    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <form className="bg-blue-950 rounded-2xl shadow-xl w-96 p-6 relative">
        <header className="flex justify-between items-center pb-3 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar1Icon className="text-gray-400" size={24} />
            <button
              type="button"
              onClick={fetchGoogleCalendarEvents}
              className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 text-sm"
              disabled={isFetching}
            >
              <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
              <span>Sync Google Calendar</span>
            </button>
          </div>
          <div className="flex space-x-3">
            {selectedEvent && (
              <button
                type="button"
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        </header>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Add title"
            value={title}
            required
            className="w-full bg-transparent border-b border-gray-400 text-white text-lg focus:outline-none focus:border-blue-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-gray-300">{daySelected.format("dddd, MMMM DD")}</p>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-400" size={20} />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            />
            <span className="text-gray-300">to</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <input
            type="text"
            placeholder="Add a description"
            value={description}
            required
            className="w-full bg-transparent border-b border-gray-400 text-white focus:outline-none focus:border-blue-400"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            {labelsClasses.map((lblClass) => (
              <span
                key={lblClass}
                onClick={() => setSelectedLabel(lblClass)}
                className={`bg-${lblClass}-500 w-6 h-6 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all ${
                  selectedLabel === lblClass ? "border-white" : "border-transparent"
                }`}
              >
                {selectedLabel === lblClass && <span className="text-white">✓</span>}
              </span>
            ))}
          </div>
        </div>
        <footer className="mt-5 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}   