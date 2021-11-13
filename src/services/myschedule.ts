/**
 * MySchedule
 *
 * @module myschedule
 */

import moment from 'moment';
import http from './http';

type MyScheduleEvent = {
  EVENT_ID: string;
  LOCATION: string;
  DESCRIPTION: string;
  MON_CDE: string;
  TUE_CDE: string;
  WED_CDE: string;
  THU_CDE: string;
  FRI_CDE: string;
  SAT_CDE: string;
  SUN_CDE: string;
  IS_ALLDAY: boolean;
  /** A TimeSpan of the format HH:mm:ss stringified */
  BEGIN_TIME: string;
  /** A TimeSpan of the format HH:mm:ss stringified */
  END_TIME: string;
};

const getMySchedule = (username: string = ''): Promise<MyScheduleEvent[]> =>
  http.get(`myschedule/${username}/`);

const getMyScheduleEventId = (eventId: string): Promise<MyScheduleEvent> =>
  http.get(`myschedule/event/${eventId}/`);

function getEventDays(event: MyScheduleEvent): number[] {
  let dayArray = [];

  if (event.SUN_CDE === 'N') {
    dayArray.push(1);
  }
  if (event.MON_CDE === 'M') {
    dayArray.push(2);
  }
  if (event.TUE_CDE === 'T') {
    dayArray.push(3);
  }
  if (event.WED_CDE === 'W') {
    dayArray.push(4);
  }
  if (event.THU_CDE === 'R') {
    dayArray.push(5);
  }
  if (event.FRI_CDE === 'F') {
    dayArray.push(6);
  }
  if (event.SAT_CDE === 'S') {
    dayArray.push(7);
  }

  return dayArray;
}

function makeMySchedule(myschedule: MyScheduleEvent[]): Object[] {
  let today = moment();
  let eventArray = [];
  for (let event of myschedule) {
    let beginTime = moment(event.BEGIN_TIME, 'HH:mm:ss')
      .set('y', today.year())
      .set('M', today.month())
      .set('d', today.day());
    let endTime = moment(event.END_TIME, 'HH:mm:ss')
      .set('y', today.year())
      .set('M', today.month())
      .set('d', today.day());
    let eventTitle = event.DESCRIPTION + ' in ' + event.LOCATION;
    for (const day of getEventDays(event)) {
      const customEvent = {
        id: parseInt(event.EVENT_ID),
        title: eventTitle,
        start: beginTime.toDate(),
        end: endTime.toDate(),
        resourceId: day,
        allDay: event.IS_ALLDAY,
      };
      eventArray.push(customEvent);
    }
  }
  return eventArray;
}

const addMySchedule = (mySchedule: object): Promise<MyScheduleEvent> =>
  http.post(`myschedule/`, mySchedule);

const updateMySchedule = (mySchedule: object): Promise<MyScheduleEvent> =>
  http.put(`myschedule/`, mySchedule);

const deleteMySchedule = (eventID: string): Promise<MyScheduleEvent> =>
  http.del(`myschedule/${eventID}`);

const myScheduleService = {
  getMyScheduleEventId,
  getMySchedule,
  makeMySchedule,
  addMySchedule,
  updateMySchedule,
  deleteMySchedule,
};

export default myScheduleService;
