import React from 'react';
import '../Styles/EventCard.css';
import getPositionFromTop from '../Helpers/getPositionFromTop';
import getDurationHeight from '../Helpers/getDurationHeight';
import getWidthAndLeft from '../Helpers/getWidthAndLeft';

function EventCard({appointmentsData}) {
  const filteredData = getWidthAndLeft(appointmentsData);
  return (
      <div  style={{position: 'relative', width: '100%', display: 'flex'}}>
        {filteredData.map((appointment) => {
            return(<div 
              className='event' 
              key={appointment.id}
              style={{
                height: `${getDurationHeight(appointment.duration)}%`, // duration of event
                top: `${getPositionFromTop(appointment.start)}%`, // start of event
                left: `${appointment.left}%`, // position to avoid overlapping
                width: `${appointment.width}%`,
              }}
            >
              ID: {appointment.id} @{appointment.start} - for: {appointment.duration}mins
          </div>)}
        )}
        
      </div>
    );
}

export default EventCard;
