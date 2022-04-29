import scheduleList from '../constants/scheduleList';
import moment from 'moment';

 
 // Position from top is basically the start of the event
 function getPositionFromTop(appointmentStart){
  const scheduleStartTime = moment.duration(scheduleList[0]).asMinutes();

  // we add 1 hour (60minutes) to reach end of div and remove startTime to flatten the measure from 0 to end of schedule
  const scheduleEndTime = moment.duration(scheduleList[scheduleList.length - 1]).asMinutes() + 60 - scheduleStartTime; 

  return (moment.duration(appointmentStart).asMinutes() - scheduleStartTime) / scheduleEndTime * 100
}

export default getPositionFromTop;