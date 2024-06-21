import { Button, CardContent, Collapse, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PosterItem.module.css';

const PosterItem = ({ posting, size, handlePosterEdit, handlePosterelete }) => {
  const [open, setOpen] = useState(false);
  const isOnline = useNetworkStatus();
  const { profile } = useUser();

  // const author = (
  //     <Typography className={styles.news_column}>
  //       {!isOnline || unapproved ? (
  //         posting.author
  //       ) : (
  //         <Link className={styles.news_authorProfileLink} to={`/profile/${posting.ADUN}`}>
  //           {posting.author}
  //         </Link>
  //       )}
  //     </Typography>
  //   );

  //require image upload

  //main grid display image and title

  //onClick open card to display description
};

export default PosterItem;
