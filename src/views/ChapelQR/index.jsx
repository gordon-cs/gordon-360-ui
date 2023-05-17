import { Card, CardContent, Typography } from '@mui/material';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import _eventService from '../../services/event';

const ChapelQR = () => {
  const [qr, setQR] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTimer, setCurrentTimer] = useState(null);

  useEffect(() => {
    const startFetchChapel = async () => {
      try {
        const response = await _eventService.getChapelCipher(2999140);
        let url = window.location;
        let baseUrl = url.protocol + '//' + url.host + '/';
        setQR(
          await QRCode.toDataURL(baseUrl + 'chapelqr/attend?code=' + response, {
            scale: '20',
            color: { dark: '#014982', light: '#0000' },
          }),
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

      //return setTimeout(() => setCurrentTimer(startFetchChapel), timeToSwitch - nowMilliseconds);
    };
    startFetchChapel();

    const nowMilliseconds = parseInt(new Date().getTime());
    const timeToSwitch = (nowMilliseconds / 30000 + 1) * 30000;
    setTimeout(() => {
      setInterval(startFetchChapel, 30000);
    }, timeToSwitch - nowMilliseconds);

    //return () => clearTimeout(currentTimer);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Card>
      <CardContent>
        <img style={{ display: 'block', margin: 'auto', height: '75vh' }} src={qr} alt="QR Code" />
        <Typography variant="h4" align="center">
          Scan this QR code to check in to chapel.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChapelQR;
