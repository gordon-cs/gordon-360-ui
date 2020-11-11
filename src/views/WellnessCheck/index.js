import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';

import GordonLoader from '../../components/Loader';
import HealthStatus from './components/HealthStatus';
import Login from '../Login';
import user from '../../services/user';

import './index.css';

const WellnessCheck = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (authentication) {
      user
        .getProfileInfo()
        .then((u) => setCurrentUser(u))
        .then(() => {
          user
            .getImage()
            .then((i) => setImage(i))
            .then(() => {
              setIsAuthenticated(true);
              setLoading(false);
            });
        });
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authentication]);

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} md={8}>
          <Card className="wellness-check">
            <CardContent>
              <CardHeader title={`${currentUser.FirstName} ${currentUser.LastName}`} />
              <Card>
                <img
                  className="rounded-corners user-image"
                  src={`data:image/jpg;base64,${image.pref ? image.pref : image.def}`}
                  alt={`${currentUser.FirstName} ${currentUser.LastName}`}
                />
              </Card>
              <HealthStatus />
            </CardContent>
            <div className="wellness-header">Questions? Health Center: (978) 867-4300 </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default WellnessCheck;
