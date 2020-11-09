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
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication]);

  const loadPage = async () => {
    setLoading(true);

    const [
      { FirstName, LastName },
      { def: defaultImage, pref: preferredImage },
    ] = await Promise.all([user.getProfileInfo(), user.getImage()]);

    setUsername(`${FirstName} ${LastName}`);
    setImage(preferredImage ?? defaultImage);

    setLoading(false);
  };

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
              <CardHeader title={username} />
              <Card>
                <img
                  className="rounded-corners user-image"
                  src={`data:image/jpg;base64,${image}`}
                  alt={username}
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
