import React from 'react';
import '../Styles/TimeList.css';
import scheduleList from '../constants/scheduleList';

function TimeList() {

  return (
    <div >        
      <ul className="schedule-list">
        {scheduleList.map((time, i) => <li key={i}>{time}</li>)}
      </ul>
    </div>
  )
}

export default TimeList;