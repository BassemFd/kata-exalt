import moment from 'moment';

function getWidthAndLeftPosition(appointmentsData){

  // Set fields for rendering events
  appointmentsData.forEach(appointment => {
    appointment.leftPosition = 0;
    appointment.startTime = moment.duration(appointment.start).asMinutes();
    appointment.endTime = appointment.startTime + appointment.duration;
  });

  // We sort events by time
      appointmentsData.sort((a, b) => b.endTime - a.endTime );

  // loop to compare all events within each other
    appointmentsData.forEach((appointment, i) => {
          for (let k = i; k < appointmentsData.length; k++) {
              if (i !== k 
                && appointment.endTime > appointmentsData[k].startTime 
                && appointment.startTime < appointmentsData[k].endTime 
                && appointment.leftPosition === appointmentsData[k].leftPosition)
                {
                  appointmentsData[k].leftPosition++; // position from Y axis
                }
              }  
            })
      
    // Here we find the number of events that overlaps in same period of time so we can divide the width by number of events accordingly
      appointmentsData.forEach((appointment, i) => {
        let numberOfOverlaps = 0;
        for (let k = 0; k < appointmentsData.length; k++) {
            if (i !== k 
              && appointment.endTime > appointmentsData[k].startTime 
              && appointment.startTime < appointmentsData[k].endTime 
              && appointment.leftPosition !== appointmentsData[k].leftPosition)
              {
                numberOfOverlaps = Math.max(...[numberOfOverlaps, appointment.leftPosition, appointmentsData[k].leftPosition]);
              }
            }  
        appointment.width = 100 / (numberOfOverlaps + 1);
    })

return appointmentsData;
}

export default getWidthAndLeftPosition;