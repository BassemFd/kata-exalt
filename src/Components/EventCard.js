import React, { useState, useEffect } from 'react';
import '../Styles/EventCard.css';
import getPositionFromTop from '../Helpers/getPositionFromTop';
import getDurationHeight from '../Helpers/getDurationHeight';
import getWidthAndLeftPosition from '../Helpers/getWidthAndLeft';

function EventCard({appointmentsData}) {
  // useState and useEffect is for show, no real use in this specific case, might be more usefull for dynamic datasets
  const [filteredData, setFilteredData] =  useState([]); 

useEffect(() => {
  setFilteredData(getWidthAndLeftPosition(appointmentsData))
}, [])

  return (
      <div  style={{position: 'relative', width: '100%', display: 'flex'}}>
        {filteredData.map((appointment) => 
            (<div 
              className='event' 
              key={appointment.id}
              style={{
                height: `${getDurationHeight(appointment.duration)}%`, // duration of event
                top: `${getPositionFromTop(appointment.start)}%`, // start of event
                width: `${appointment.width}%`,
                left: `${appointment.width * appointment.leftPosition}%`, // position to avoid overlapping
              }}
            >
              ID: {appointment.id} @{appointment.start} - for: {appointment.duration}mins
          </div>)
        )}
        
      </div>
    );
}

export default EventCard;
