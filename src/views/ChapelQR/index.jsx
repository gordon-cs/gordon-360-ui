import { Card, CardContent, Typography } from '@mui/material';
import GordonLoader from 'components/Loader';
import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import _eventService from '../../services/event';

const getQRUrl = (eventInfo) => {
  let url = window.location;
  let baseUrl = url.protocol + '//' + url.host + '/';
  let cipher = Base64.stringify(
    CryptoJS.HmacSHA1(eventInfo.Title + '|' + Date.now().toString(), eventInfo.EventHash),
  );
  return baseUrl + 'chapelqr/attend?id=' + eventInfo.EventNumber + '&code=' + cipher;
};

const createQR = async (eventInfo) => {
  console.log(new Date());
  console.log(eventInfo);

  return await QRCode.toDataURL(getQRUrl(eventInfo), { scale: '20' });
};

const ChapelQR = () => {
  const [qr, setQR] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrURL, setQRURL] = useState('');

  useEffect(() => {
    const loadQR = async (eventInfo) => {
      try {
        setQR(await createQR(eventInfo));
        setQRURL(getQRUrl(eventInfo));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    _eventService
      .getChapelEventInfo(2999140)
      .then((eventInfo) => {
        loadQR(eventInfo);

        const nowMilliseconds = parseInt(new Date().getTime());
        const timeToSwitch = parseInt(nowMilliseconds / 30000 + 1) * 30000;
        setTimeout(() => {
          loadQR(eventInfo);
          setInterval(() => loadQR(eventInfo), 30000);
        }, timeToSwitch - nowMilliseconds);
      })
      .catch((error) => {
        setError(error.message);
      });

    //return () => clearTimeout(currentTimer);
  }, []);

  return loading ? (
    <GordonLoader />
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <Card>
      <CardContent>
        <img style={{ display: 'block', margin: 'auto', height: '75vh' }} src={qr} alt="QR Code" />
        <Typography variant="h6" align="center">
          DEBUG:{' '}
          <a href={qrURL} target="_blank" rel="noreferrer">
            {qrURL}
          </a>
        </Typography>
        <Typography variant="h4" align="center">
          Scan this QR code to check in to chapel.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChapelQR;
