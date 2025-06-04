import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Dialog,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getCurrentPosters } from 'services/poster';

const ClubPosters = ({ clubName, clubCode }) => {
  const [posters, setPosters] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const allPosters = await getCurrentPosters();
        const filtered = allPosters.filter((p) => p.ClubCode === clubCode);
        setPosters(filtered);
      } catch (error) {
        console.error('Failed to load posters:', error);
        setPosters([]);
      }
    };

    if (clubCode) {
      fetchPosters();
    }
  }, [clubCode]);

  const handleOpen = (poster) => {
    setSelectedPoster(poster);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPoster(null);
  };

  console.log('Selected Poster Priority:', selectedPoster?.Priority);

  return (
    <>
      <Card elevation={0}>
        <CardHeader
          title={`Posters from ${clubName}`}
          className="gc360_header"
          style={{ marginLeft: 0, width: '125%' }}
        />
        <CardContent>
          <Grid container direction="row" spacing={4} className={'test1'}>
            {posters.length > 0 ? (
              posters.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={3} key={item.key}>
                  <Card variant="outlined" elevation={0} sx={{ position: 'relative' }}>
                    {item.Priority === 1 && (
                      <Typography
                        variant="h3"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 12,
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: '3rem',
                          zIndex: 3,
                          userSelect: 'none',
                          fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
                          textShadow: '2px 2px 8px #00000055',
                        }}
                      >
                        !
                      </Typography>
                    )}
                    <CardActionArea onClick={() => handleOpen(item)}>
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.ImagePath}
                        title={item.Title}
                        description={item.Description}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'} variant="h6" fontWeight="bold">
                          {item.Title}
                        </Typography>
                        <Typography
                          className={'Poster Description'}
                          variant="body2"
                          fontStyle="italic"
                          fontWeight="light"
                        >
                          {item.Description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography variant="h5" align="center">
                  {'No Posters to Show for this involvement'}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {selectedPoster && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          // style={{ backgroundColor: '#ffffff00' }}
        >
          <Card>
            <CardMedia
              component="img"
              alt={selectedPoster.alt}
              src={selectedPoster.ImagePath}
              title={selectedPoster.Title}
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" textAlign={'center'}>
                {selectedPoster.Title}
              </Typography>
              <Typography variant="body1" fontStyle="italic" textAlign={'center'}>
                {selectedPoster.Description}
              </Typography>
            </CardContent>
          </Card>
        </Dialog>
      )}
    </>
  );
};

export default ClubPosters;
