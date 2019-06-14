import React, { Component, Fragment } from 'react';
import moment from 'moment';

import Calendar from 'react-big-calendar/dist/react-big-calendar';
import momentLocalizer from 'react-big-calendar/lib/localizers/moment';

import './courseschedule.css';

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
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

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Monday' },
  { resourceId: 2, resourceTitle: 'Tuesday' },
  { resourceId: 3, resourceTitle: 'Wednesday' },
  { resourceId: 4, resourceTitle: 'Thursday' },
  { resourceId: 5, resourceTitle: 'Friday' },
  { resourceId: 6, resourceTitle: 'Saturday' },
  { resourceId: 7, resourceTitle: 'Sunday' },
];

let formats = {
  dayHeaderFormat: (date, localizer = momentLocalizer(moment)) =>
    localizer.format(date, 'MMMM YYYY'),
};

let Resource = ({ localizer = momentLocalizer(moment) }) => (
  <Fragment>
    <Calendar
      events={events}
      localizer={localizer}
      step={60}
      defaultView="day"
      view={['day']}
      defaultDate={new Date(2018, 0, 29)}
      resources={resourceMap}
      resourceIdAccessor="resourceId"
      resourceTitleAccessor="resourceTitle"
      formats={formats}
    />
  </Fragment>
);

export default Resource;
