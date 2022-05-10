import moment from 'moment';

function getWidthAndLeft(events){
  events.sort((a, b) => moment.duration(a.start).asMinutes() - moment.duration(b.start).asMinutes())
events.forEach(appointment => {
  appointment.startTime = moment.duration(appointment.start).asMinutes();
  appointment.endTime = appointment.startTime + appointment.duration;
  appointment.overlapsWith = [];
  appointment.left = 0;
});

for (let i = 0; i < events.length; i++) {
  for (let k = i + 1; k < events.length; k++) {
      if (events[i] !== events[k]) {
        if((events[i].startTime > events[k].startTime && events[i].endTime < events[k].endTime) 
        || (events[i].startTime === events[k].startTime && events[i].endTime === events[k].endTime)
        || (events[i].startTime > events[k].startTime && events[i].startTime < events[k].endTime && events[i].endTime > events[k].endTime)
        || (events[i].startTime <= events[k].startTime && events[i].endTime > events[k].endTime)
        || (events[i].startTime < events[k].startTime && events[i].endTime > events[k].startTime && events[i].endTime < events[k].endTime)
        || (events[i].startTime < events[k].startTime && events[i].endTime === events[k].endTime)
        ){
            events[k].overlapsWith.push(events[i].id)
            events[i].overlapsWith.push(events[k].id)
            events[i].left += 33.3;

        }
      }
    }
  };

  events.map(event => {
    if(event.overlapsWith.length === 0){
      event.width = 100;
      event.left = 0;
    } else {
      // event.width = 100/(event.overlapsWith.length);
      event.width = 33.3;
    }
  })

return events;
}

export default getWidthAndLeft;