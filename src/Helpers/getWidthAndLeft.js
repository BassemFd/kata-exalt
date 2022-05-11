import moment from 'moment';

function getWidthAndLeftPosition(appointmentsData){

  // Set fields for rendering events
  appointmentsData.forEach(appointment => {
    appointment.leftPosition = 0;
    appointment.startTime = moment.duration(appointment.start).asMinutes();
    appointment.endTime = appointment.startTime + appointment.duration;
  });

  // We sort event by event with next event by start time but also by end time, to figure out which events to group when overlapping
  appointmentsData.sort((a, b) =>{ 
    if (a.startTime < b.startTime || a.endTime < b.endTime){ 
      return -1
    } else if(a.startTime > b.startTime || a.endTime > b.endTime){
      return 1
    } else {
     return 0; 
   }
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