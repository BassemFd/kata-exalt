import React from 'react';
import '../Styles/EventCard.css';
import getPositionFromTop from '../Helpers/getPositionFromTop';
import getDurationHeight from '../Helpers/getDurationHeight';

function EventCard({appointmentsData}) {
  
  return (
      <div  style={{position: 'relative'}}>
        {appointmentsData.map((appointment) => 
          <div 
              className='event' 
              key={appointment.id}
              style={{
                height: getDurationHeight(appointment.duration) + '%', // duration of event
                top: getPositionFromTop(appointment.start) + '%', // start of event
              }}
            >
           {appointment.id} - {appointment.start} h
          </div>
        )}
        
      </div>
    );
}

export default EventCard;
