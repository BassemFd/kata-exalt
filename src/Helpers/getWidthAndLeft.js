import moment from 'moment';

function getWidthAndLeftPosition(appointmentsData){
  appointmentsData.sort((a, b) => moment.duration(a.start).asMinutes() - moment.duration(b.start).asMinutes());

  // Set fields for rendering events
  appointmentsData.forEach(appointment => {
    appointment.leftPosition = 0;
    appointment.startTime = moment.duration(appointment.start).asMinutes();
    appointment.endTime = appointment.startTime + appointment.duration;
  });

  // double loop to compare all events within each other
      for (let i = 0; i < appointmentsData.length; i++) {
        for (let k = i; k < appointmentsData.length; k++) {
            if (i !== k 
              && appointmentsData[i].endTime > appointmentsData[k].startTime 
              && appointmentsData[i].startTime < appointmentsData[k].endTime 
              && appointmentsData[i].leftPosition === appointmentsData[k].leftPosition)
              {
                appointmentsData[k].leftPosition++; // position from Y axis
              }
            }  
          }
      
    // Here we find the number of events that overlaps in same period of time so we can divide the width by number of events accordingly
      for (let i = 0; i < appointmentsData.length; i++) {
        let numberOfOverlaps = 0;
        for (let k = 0; k < appointmentsData.length; k++) {
            if (i !== k 
              && appointmentsData[i].endTime > appointmentsData[k].startTime 
              && appointmentsData[i].startTime < appointmentsData[k].endTime 
              && appointmentsData[i].leftPosition !== appointmentsData[k].leftPosition)
              {
                numberOfOverlaps = Math.max(...[numberOfOverlaps, appointmentsData[i].leftPosition, appointmentsData[k].leftPosition]);
              }
            }  
        appointmentsData[i].width = 100 / (numberOfOverlaps + 1);
    }

return appointmentsData;
}

export default getWidthAndLeftPosition;