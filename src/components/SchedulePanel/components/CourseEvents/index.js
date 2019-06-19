import moment, { now } from 'moment';

var startTime = moment();
startTime.add(1, 'h');
startTime.set('m', 0);

var endTime = moment().clone(startTime);
endTime.add(2, 'h');
endTime.set('m', 0);

export default [
  {
    id: 0,
    title: 'Board meeting',
    start: startTime.toDate(),
    end: endTime.toDate(),
    resourceId: 2,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];
