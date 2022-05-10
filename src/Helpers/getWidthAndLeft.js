import moment from 'moment';

function getWidthAndLeft(input){
  input.sort((a, b) => moment.duration(a.start).asMinutes() - moment.duration(b.start).asMinutes())
input.forEach(appointment => {
  appointment.startTime = moment.duration(appointment.start).asMinutes();
  appointment.endTime = appointment.startTime + appointment.duration;
  appointment.overlapsWith = [];
  appointment.left = 0;
});

for (let i = 0; i < input.length; i++) {
  for (let k = i + 1; k < input.length; k++) {
      if (input[i] !== input[k]) {
        if((input[i].startTime > input[k].startTime && input[i].endTime < input[k].endTime) 
        || (input[i].startTime === input[k].startTime && input[i].endTime === input[k].endTime)
        || (input[i].startTime > input[k].startTime && input[i].startTime < input[k].endTime && input[i].endTime > input[k].endTime)
        || (input[i].startTime <= input[k].startTime && input[i].endTime > input[k].endTime)
        || (input[i].startTime < input[k].startTime && input[i].endTime > input[k].startTime && input[i].endTime < input[k].endTime)
        || (input[i].startTime < input[k].startTime && input[i].endTime === input[k].endTime)
        ){
            input[k].overlapsWith.push(input[i].id)
            input[i].overlapsWith.push(input[k].id)
            input[i].left += 33.3;

        }
      }
    }
  };

  input.map(event => {
    if(event.overlapsWith.length === 0){
      event.width = 100;
      event.left = 0;
    } else {
      // event.width = 100/(event.overlapsWith.length);
      event.width = 33.3;
    }
  })

return input;
}

export default getWidthAndLeft;