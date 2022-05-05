import React from 'react';
import '../Styles/EventCard.css';
import getPositionFromTop from '../Helpers/getPositionFromTop';
import getDurationHeight from '../Helpers/getDurationHeight';
import moment from 'moment';

function EventCard({appointmentsData}) {
  let appointmentsDataCopy = [...appointmentsData];
  appointmentsDataCopy.sort((a, b) => moment.duration(b.start).asMinutes() - moment.duration(a.start).asMinutes())

   // left position will be used to avoid events overlapping each other
   let left = 0;
   let overlappedEvents = {}
   function getLeftAndWidth(appointment){
     if(!appointment.width) appointment.width = 100;
     const startTime = moment.duration(appointment.start).asMinutes();
     const endTime = startTime + appointment.duration;
     left = 0;
     appointmentsDataCopy.forEach((app) => {
      if(!app.width) app.width = 100;
      if(app.id !== appointment.id){
        const eventStartTime = moment.duration(app.start).asMinutes();
        const eventEndTime = moment.duration(app.start).asMinutes() + app.duration;
        
        if((endTime > eventStartTime && endTime <= eventEndTime)){
         left += 33.3;
         appointmentsDataCopy = appointmentsDataCopy.filter(element => element.id !== appointment.id);
        }

        if((startTime <= eventStartTime && startTime > eventEndTime) || (endTime > eventStartTime && endTime <= eventEndTime) || (startTime < eventEndTime && endTime > eventEndTime)){ 
            console.log(app.id)
            console.log(appointment.id)
          if(!overlappedEvents[app.id]) overlappedEvents[app.id] = [];
          if(!overlappedEvents[appointment.id]) overlappedEvents[appointment.id] = [];
          overlappedEvents[app.id].push(appointment.id);
          // overlappedEvents[appointment.id].push(app.id, appointment.id);
          appointment.width = 33.3
          app.width = 33.3
          }
      };
    });

    console.log(overlappedEvents)
  };
  return (
      <div  style={{position: 'relative', width: '100%', display: 'flex'}}>
        {appointmentsDataCopy.map((appointment) => {
          getLeftAndWidth(appointment);
          console.log(overlappedEvents)

            return(<div 
              className='event' 
              key={appointment.id}
              style={{
                height: `${getDurationHeight(appointment.duration)}%`, // duration of event
                top: `${getPositionFromTop(appointment.start)}%`, // start of event
                left: `${left}%`, // position to avoid overlapping
                width: `${appointment.width}%`,
                // minWidth: '10vw',
                // maxWidth: '100%'
              }}
            >
              ID: {appointment.id} @{appointment.start} - for: {appointment.duration}mins
          </div>)}
        )}
        
      </div>
    );
}

export default EventCard;
