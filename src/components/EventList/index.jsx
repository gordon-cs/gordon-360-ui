import EventItem from './components/EventItem';
import { windowBreakWidths } from 'theme';

import useWindowSize from 'hooks/useWindowSize';

import { List, Grid, Typography, Card, CardHeader } from '@mui/material';
import styles from './EventList.module.css';

import { useState } from 'react';

const smallHeader = (
  <Typography variant="h5" className={styles.header_text}>
    Events
  </Typography>
);

const headings = [
  {
    name: 'Event',
    size: '4',
  },
  {
    name: 'Date',
    size: '2',
  },
  {
    name: 'Time',
    size: '2',
  },
  {
    name: 'Location',
    size: '4',
  },
];

const fullHeader = (
  <Grid container direction="row">
    {headings.map(({ name, size }) => (
      <Grid item xs={size}>
        <Typography variant="h5" className={styles.header_text}>
          {name}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

const noEvents = (
  <Grid item align="center">
    <br />
    <Typography variant="h4" align="center">
      No Events To Show
    </Typography>
    <br />
  </Grid>
);

const breakpointWidth = windowBreakWidths.breakSM;

const EventList = ({ events }) => {
  const [width] = useWindowSize();

  const header = width < breakpointWidth ? smallHeader : fullHeader;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = events.slice(firstIndex, lastIndex);
  const npage = Math.ceil(events.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Card>
      <CardHeader title={header} className={styles.header} />
      <Grid>
        <List className="gc360_event_list" disablePadding>
          {events?.length < 1
            ? noEvents
            : records.map((event) => <EventItem event={event} key={event.Event_ID} />)}
        </List>
      </Grid>
      <Grid>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li className={"page-item ${currentPage === n ? 'active' : ''}"} key={i}>
              <a href="#" className="page-item" onClick={changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </Grid>
    </Card>
  );
};
export default EventList;
