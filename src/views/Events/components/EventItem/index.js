import PropTypes from 'prop-types';
import GoogleIcon from 'react-icons/lib/fa/google';
import MicrosoftIcon from 'react-icons/lib/fa/windows';
import AppleIcon from 'react-icons/lib/fa/apple';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Collapse from '@material-ui/core/Collapse';
import './event-item.css';

const styles = {
  menu: {
    marginTop: '2px',
    marginBottom: '8px',
    marginLeft: '8px',
    marginRight: '8px',
    backgroundColor: 'white',
    webkitBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)',
    mozBoxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)',
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)',
  },

  grid: {
    padding: '8px',
  },

  calendarLogo: {
    marginBottom: '2pt',
  },
};
export default class GordonEventItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.toggleCalendarMenu = this.toggleCalendarMenu.bind(this);

    this.state = {
      open: false,
      showCalendarMenu: false,
    };
  }

  toggleCalendarMenu() {
    this.setState({ showCalendarMenu: !this.state.showCalendarMenu });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { event } = this.props;
    const subheader = `${event.date}, ${event.timeRange}`;

    // let content;
    // if (event.Occurrences.length > 1) {
    //   content = event.Occurrences
    //     .map(locations => (
    //       <ListItem >
    //         <ListItemText key={location[2]} primary={DateTime.fromISO(locations[0]).toFormat('ff')} secondary={locations[2]} />
    //       </ListItem>
    //     ));
    // }

    return (
      <section>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid item xs={8} sm={9} md={10}>
                <Typography>{event.title}</Typography>
                <Typography variant="caption">{subheader}</Typography>
                <Typography variant="caption">{event.location}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={8} sm={9} md={10}>
                <Typography>Description</Typography>
                <Typography variant="caption">{event.Description}</Typography>
                {/* {content} */}
              </Grid>
              <Grid item sm={4} md={2} style={styles.grid}>
                {/* This button is not functional yet */}
                {/* TODO: Add calendar integration */}
                <Button raised color="primary" onClick={this.toggleCalendarMenu}>
                  Add to Calendar
                </Button>
                <Collapse
                  in={this.state.showCalendarMenu}
                  timeout="auto"
                  unmountOnExit
                  color="primary"
                >
                  <MenuList style={styles.menu} role="menu">
                    <MenuItem onClick={this.toggleCalendarMenu}>
                      <ListItemIcon>
                        <GoogleIcon style={styles.calendarLogo} />
                      </ListItemIcon>
                      <ListItemText inset primary="Google" />
                    </MenuItem>
                    <MenuItem onClick={this.toggleCalendarMenu}>
                      <ListItemIcon>
                        <MicrosoftIcon style={styles.calendarLogo} />
                      </ListItemIcon>
                      <ListItemText inset primary="Outlook" />
                    </MenuItem>
                    <MenuItem onClick={this.toggleCalendarMenu} disabled>
                      <ListItemIcon>
                        <AppleIcon style={styles.calendarLogo} />
                      </ListItemIcon>
                      <ListItemText inset primary="iCloud" />
                    </MenuItem>
                  </MenuList>
                </Collapse>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </section>
    );
  }
}

GordonEventItem.propTypes = {
  event: PropTypes.shape({
    Event_ID: PropTypes.string.isRequired,
    Event_Name: PropTypes.string.isRequired,
    Event_Title: PropTypes.string.isRequired,
    Event_Type_Name: PropTypes.string,
    Category_ID: PropTypes.number,
    Description: PropTypes.string,
    Occurrences: PropTypes.array,
  }).isRequired,
};
