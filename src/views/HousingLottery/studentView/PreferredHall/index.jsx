import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import HallSlot from './HallSlotComponent';

const PreferredHallsCard = () => {
  const [count, setCount] = useState(1);
  const [preferredHallList, setPreferredHallList] = useState([[], []]);
  const searchHallTitle = <div align="left">Preferred Halls</div>;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={searchHallTitle} className="gc360_header" />
          <CardContent height="500">
            {Array(count).fill(<HallSlot rank={count} />)}
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={() => setCount(count + 1)}>
                Add a Hall
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PreferredHallsCard;
