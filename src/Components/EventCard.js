import React from 'react';
import '../Styles/EventCard.css';

function EventCard({appointmentsData}) {
  
  
  return (
      <div  style={{position: 'relative'}}>
        {appointmentsData.map((appointment) => 
          <div 
              className='event' 
              key={appointment.id} 
            >
           {appointment.id} - {appointment.start} h
          </div>
        )}
        
      </div>
    );
}

export default EventCard;
