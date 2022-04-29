import scheduleList from '../constants/scheduleList';

  // height is the length/duration of each event
  function getDurationHeight(appointmentDuration){
    return (appointmentDuration / (scheduleList.length * 60)) * 100
  }

  export default getDurationHeight;