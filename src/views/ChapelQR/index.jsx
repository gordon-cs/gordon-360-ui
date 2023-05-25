import { Card, CardContent, Typography } from '@mui/material';
import GordonLoader from 'components/Loader';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import _eventService from '../../services/event';

const getQRUrl = (eventInfo) => {
  let url = window.location;
  let baseUrl = url.protocol + '//' + url.host + '/';
  try {
    let key = CryptoJS.enc.Hex.parse(eventInfo.EventHash);
    let iv = CryptoJS.enc.Hex.parse(eventInfo.EventHash.substring(0, 16));
    console.log(key);
    let plain = CryptoJS.enc.Utf8.parse(eventInfo.Title + '|' + Date.now().toString());

    let cipher = CryptoJS.AES.encrypt(plain, key, {
      keySize: 256 / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv,
    }).toString();
    console.log(cipher);
    return baseUrl + 'chapelqr/attend?id=' + eventInfo.EventNumber + '&code=' + cipher;
  } catch (error) {
    console.log(error);
  }
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

  const loadQR = async () => {
    try {
      _eventService
        .getChapelEventInfo(2999140)
        .then(async (eventInfo) => {
          setQR(await createQR(eventInfo));
          setQRURL(getQRUrl(eventInfo));
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      alert(error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    if (!qr) {
      loadQR();
    }

    const nowMilliseconds = parseInt(new Date().getTime());
    const timeToSwitch = parseInt(nowMilliseconds / 30000 + 1) * 30000;

    let timer = setTimeout(() => {
      loadQR();
    }, timeToSwitch - nowMilliseconds);

    return () => clearTimeout(timer);
  }, [qr]);

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
