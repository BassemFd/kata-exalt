import React from 'react';
import '../Styles/EventCard.css';
import getPositionFromTop from '../Helpers/getPositionFromTop';
import getDurationHeight from '../Helpers/getDurationHeight';
import moment from 'moment';

function EventCard({appointmentsData}) {
  let appointmentsDataCopy = [...appointmentsData];

   // left position will be used to avoid events overlapping each other
   function getLeftPosition(appointment){
    const startTime = moment.duration(appointment.start).asMinutes();
    const endTime = startTime + appointment.duration;
    let left = 0;


    appointmentsDataCopy.forEach((app) => {
      if(app.id !== appointment.id){
        const eventStartTime = moment.duration(app.start).asMinutes();
        const eventEndTime = moment.duration(app.start).asMinutes() + app.duration;

        if((startTime > eventStartTime && startTime < eventEndTime) // start of an event is in between start and end of other event
          || (endTime < eventEndTime && endTime > eventStartTime) // end of event is in between start and end of other event
          || (startTime === eventStartTime && endTime === eventEndTime) // start and end are exactly the same in both events
          ){
            left += 15
            appointmentsDataCopy = appointmentsDataCopy.filter(element => element.id !== appointment.id) 
          };
      };
    });

    return left
  };

  return (
      <div  style={{position: 'relative'}}>
        {appointmentsData.map((appointment) => 
          <div 
              className='event' 
              key={appointment.id}
              style={{
                height: `${getDurationHeight(appointment.duration)}%`, // duration of event
                top: `${getPositionFromTop(appointment.start)}%`, // start of event
                left: `${getLeftPosition(appointment)}vw`, // position to avoid overlapping
              }}
            >
              {appointment.id} @{appointment.start}-{appointment.duration}mins
          </div>
        )}
        
      </div>
    );
}

export default EventCard;
