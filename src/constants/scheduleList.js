import moment from 'moment';

const scheduleList = [];

// start, end, and one hour frame in milliseconds
const startSchedule = 28800000;
const endSchedule = 72000000;
const oneHourFrame = 3600000;

for(let i = startSchedule; i <= endSchedule ; i += oneHourFrame){
  scheduleList.push(moment(i).format('HH:mm'));
}

export default scheduleList;