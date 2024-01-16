import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { eachDayOfInterval, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import HeatMap from '@uiw/react-heat-map';
import UpdateHabit from './UpdateHabit';

export default function ModCalendar({ userID, username, currentToken, habitID }) {
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [habitName, setHabitName] = useState("KuchTohBhiHai");
  const [latestDate, setLatestDate] = useState();
  const [streak, setStreak] = useState(0);
  const [showUpdatehabit, setShowUpdateHabit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = async () => {
      const response = await fetch(`http://localhost:5000/habit/${userID}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      const resp = await response.json();

      // const getStreak = await fetch(`http://localhost:5000/habit/streak/${userID}`, {
      //   method: "GET",
      //   headers: { Authorization: `Bearer ${currentToken}`},
      // });
      // const streak = await getStreak.json();

      // setStreak(streak.streak);

      // date form yyyy-mm-dd
      setHabitName(resp[0].title);
      const formatedDate = resp[0].dates.map(dateString => new Date(dateString));

      setDates(formatedDate);
      setLatestDate(formatedDate[formatedDate.length - 1]);

      if (dates.length) {
        let streak = 0;
        let currentStreak = 0;

        dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
        for (let i = 0; i < dates.length; i++) {
          const currentDate = new Date(dates[i]);
          const currentUTC = Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate()
          );

          if (
            i > 0 &&
            currentUTC ===
            Date.UTC(
              new Date(dates[i - 1]).getUTCFullYear(),
              new Date(dates[i - 1]).getUTCMonth(),
              new Date(dates[i - 1]).getUTCDate()
            ) + 24 * 60 * 60 * 1000
          ) {
            currentStreak++;
          } else {
            currentStreak = 1;
          }

          if (currentStreak > streak) {
            streak = currentStreak;
          }
        }

        setStreak(streak);
      }
      else {
        setStreak(0);
      }
    }

    fetchDates();
  }, []);

  const heatMapDates = dates.map(dateString => {
    const dateObj = new Date(dateString);
    return dateObj.toISOString().slice(0, 10);
  })

  const markTodayDate = async () => {
    const resp = await fetch(`http://localhost:5000/habit/${habitID}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${currentToken}` }
    });

    await resp.json();

    window.location.reload(false);
  }

  // const showUpdateHabit = () => {
  //   setShowUpdateHabit(!showUpdateHabit);
  //   console.log(showUpdateHabit)
  // }

  return (
    <>
      <div className={`flex items-center justify-center p-5`}>
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <h1 className='text-2xl'>{habitName}</h1>
            <span className='cursor-pointer' onClick={() => { setShowUpdateHabit(true); console.log(showUpdatehabit) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </span>
          </div>
          <div className="calendar">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={({ date, view }) => (
                view === 'month' && dates.find(dDate => isSameDay(dDate, date))
                  ? 'bg-green-500 rounded-full'
                  : 'rounded-full'
              )}
            />
          </div>
          <div className="flex">Max Streak : {streak}</div>
          <div className="flex justify-center border-2 border-black rounded-md p-3 mt-5">
            {
              ((new Date(latestDate)).toDateString() === (new Date()).toDateString()) ?
                <h3>Today's date already marked</h3>
                :
                <button type='button' onClick={markTodayDate}>Mark today's date</button>
            }
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center w-full h-full'>
        <h1 className='text-2xl font-bold mb-4'>Heatmap Example</h1>
        <HeatMap
          startDate="2023-01-01"
          endDate="2023-12-31"
          data={heatMapDates}
        />
      </div>
      {/* <div className="w-full h-full">
        <h1 className='text-2xl font-bold mb-4'>HeatMap Example</h1>
        <div className="grid grid-cols-7 gap-2">
          {heatMapDates.map(date => (
            <div className="bg-red-500 text-white rounded-md p-2" key={date}>
              {date}
            </div>
          ))}
        </div>
      </div> */}
      {showUpdatehabit && (<UpdateHabit setShowUpdateHabit={setShowUpdateHabit} currentToken={currentToken} habitID={habitID} />)}
    </>
  );
}