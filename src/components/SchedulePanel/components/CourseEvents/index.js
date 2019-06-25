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
    start: startTime.toDate(),
    end: endTime.toDate(),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: startTime.toDate(),
    end: endTime.toDate(),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: startTime.toDate(),
    end: endTime.toDate(),
    resourceId: 4,
  },
];
