import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography, CircularProgress } from '@mui/material';
import { useUser } from 'hooks';
import { fetchAssignmentsByRAId } from 'services/residentLife/roomRanges';

const AssignedRooms = () => {
  const { profile } = useUser();
  const [assignedRooms, setAssignedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.ID) {
      fetchAssignmentsByRAId(profile.ID)
        .then((data) => {
          setAssignedRooms(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching assigned rooms:', error);
          setLoading(false);
        });
    }
  }, [profile]);

  if (loading) {
    return (
      <Typography align="center" color="textSecondary">
        <CircularProgress size={24} /> Loading assigned rooms...
      </Typography>
    );
  }

  return (
    <Card sx={{ mt: 2, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              My Assigned Rooms
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        {assignedRooms.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No assigned rooms.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {assignedRooms.map((assignment) => (
              <Grid item xs={12} key={assignment.Range_ID}>
                <Typography variant="body1">
                  <strong>{assignment.Hall_Name}: </strong>
                  {assignment.Room_Start} - {assignment.Room_End}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignedRooms;
