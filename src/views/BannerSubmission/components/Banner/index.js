import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import styles from './Banner.module.css';

const Banner = ({ banner, size, handleNewsItemDelete }) => {
  const [open, setOpen] = useState(false);

  const deleteButton = (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={() => handleNewsItemDelete(banner.ID)}
      className={styles.deleteButton}
    >
      Delete
    </Button>
  );

  if (size === 'single') {
    return (
      <Accordion className={styles.news_item}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" className={styles.news_heading}>
            {banner.Title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.banner_details}>
          <Typography className={styles.news_content}>Sort Order: {banner.SortOrder}</Typography>
          <Typography className={styles.news_content}>Link URL: {banner.LinkURL}</Typography>
          <img src={`data:image/jpg;base64,${banner.Image}`} alt=" " />
        </AccordionDetails>
        <AccordionActions>{deleteButton}</AccordionActions>
      </Accordion>
    );
  } else if (size === 'full') {
    return (
      <Grid
        container
        direction="row"
        onClick={() => setOpen((o) => !o)}
        className={`${styles.news_item} ${styles.approved}`}
      >
        <Grid item xs={1}>
          <Typography className={styles.news_column}>{banner.ID}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={styles.news_column}>{banner.Title}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography className={styles.news_column} style={{ fontWeight: 'bold' }}>
            {banner.LinkURL}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography className={styles.news_column}>{banner.SortOrder}</Typography>
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
          <CardContent>
            <Grid container direction="row" alignItems="center" justify="space-around">
              <Grid item xs={8} style={{ textAlign: 'left' }}>
                <img src={banner.Path} alt=" " />
              </Grid>
              <Grid item xs={4}>
                <Grid container justify="space-evenly">
                  {deleteButton}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Grid>
    );
  }
};

export default Banner;
