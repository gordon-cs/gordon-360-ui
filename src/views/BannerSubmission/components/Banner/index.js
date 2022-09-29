import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Banner.module.css';

const Banner = ({ banner, handleNewsItemDelete }) => (
  <Card>
    <CardMedia
      component="img"
      alt={banner.Title}
      src={banner.Path}
      title={banner.Title}
      className={styles.banner_image}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {banner.Title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Link:{' '}
        {banner.LinkURL ? (
          <Link href={banner.LinkURL} target="_blank" rel="noreferrer">
            {banner.LinkURL}
          </Link>
        ) : (
          'None'
        )}
      </Typography>
    </CardContent>
    <CardActions className={styles.banner_actions}>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => handleNewsItemDelete(banner.ID)}
        className={styles.deleteButton}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default Banner;
