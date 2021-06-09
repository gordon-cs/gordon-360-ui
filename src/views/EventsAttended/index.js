import React, { useEffect, useState } from 'react';
import event from 'services/event';
import GordonLoader from 'components/Loader';
import EventList from 'components/EventList';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';

import { List, Grid, Card, CardContent, Button, Typography } from '@material-ui/core';

const EventsAttended = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      if (props.authentication) {
        setLoading(true);
        const attendedEvents = await event.getAttendedChapelEvents();
        setEvents(attendedEvents);
        setLoading(false);
      }
    };
    loadEvents();
  }, [props.authentication]);

  let content;

  const style = {
    button: {
      background: gordonColors.primary.cyan,
      color: 'white',
    },
  };

  if (props.authentication) {
    if (loading === true) {
      content = <GordonLoader />;
    } else if (events.length > 0) {
      content = (
        <Grid container direction="row" justify="center" spacing="2">
          <Grid item align="center">
            <Button
              variant="contained"
              style={style.button}
              component={Link}
              to="/events?CLW%20Credits"
            >
              Need More Chapel Credits?
            </Button>
          </Grid>
          <Grid item>
            <EventList events={events} />
          </Grid>
        </Grid>
      );
    } else {
      content = (
        <Grid item align="center">
          <br /> <br />
          <Typography variant="h4" align="center">
            No Events To Show
          </Typography>
          <br />
          <Button
            variant="contained"
            style={style.button}
            component={Link}
            to="/events?CLW%20Credits"
          >
            Need More Chapel Credits?
          </Button>
        </Grid>
      );
    }
  } else {
    content = (
      <Grid container justify="center" spacing="2">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent class="cardContent">
              <h1>You are not logged in.</h1>
              <br />
              <h4>You must be logged in to view your attended events.</h4>
              <br />
              <Button
                style={style.button}
                onClick={() => {
                  window.location.pathname = '';
                }}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <section>
      <Grid container justify="center">
        <Grid item xs={12} md={12} lg={8}>
          <List>{content}</List>
        </Grid>
      </Grid>
    </section>
  );
};

export default EventsAttended;

// export default class EventsAttended extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       events: [],
//       loading: true,
//     };
//   }
//   componentDidMount() {
//     if (this.props.authentication) {
//       this.loadEvents();
//     }
//   }

//   async loadEvents() {
//     this.setState({ loading: true });
//     const events = await event.getAttendedChapelEvents();
//     this.setState({ events, loading: false });
//   }

//   render() {
//     let content;

//     const style = {
//       button: {
//         background: gordonColors.primary.cyan,
//         color: 'white',
//       },
//     };

//     if (this.props.authentication) {
//       if (this.state.loading === true) {
//         content = <GordonLoader />;
//       } else if (this.state.events.length > 0) {
//         content = (
//           <Grid container direction="row" justify="center" spacing="2">
//             <Grid item align="center">
//               <Button
//                 variant="contained"
//                 style={style.button}
//                 component={Link}
//                 to="/events?CLW%20Credits"
//               >
//                 Need More Chapel Credits?
//               </Button>
//             </Grid>
//             <Grid item>
//               <EventList events={this.state.events} />
//             </Grid>
//           </Grid>
//         );
//       } else {
//         content = (
//           <Grid item align="center">
//             <br />
//             <br />
//             <Typography variant="h4" align="center">
//               No Events To Show
//             </Typography>
//             <br />
//             <Button
//               variant="contained"
//               style={style.button}
//               component={Link}
//               to="/events?CLW%20Credits"
//             >
//               Need More Chapel Credits?
//             </Button>
//           </Grid>
//         );
//       }
//     } else {
//       content = (
//         <Grid container justify="center" spacing="2">
//           <Grid item xs={12} md={8}>
//             <Card>
//               <CardContent class="cardContent">
//                 <h1>You are not logged in.</h1>
//                 <br />
//                 <h4>You must be logged in to view your attended events.</h4>
//                 <br />
//                 <Button
//                   style={style.button}
//                   onClick={() => {
//                     window.location.pathname = '';
//                   }}
//                 >
//                   Login
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       );
//     }

//     return (
//       <section>
//         <Grid container justify="center">
//           <Grid item xs={12} md={12} lg={8}>
//             <List>{content}</List>
//           </Grid>
//         </Grid>
//       </section>
//     );
//   }
// }
