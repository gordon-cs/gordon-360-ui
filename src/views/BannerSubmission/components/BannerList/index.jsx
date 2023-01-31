import { Container, Typography } from '@mui/material';
import Banner from '../Banner';
import styles from './BannerList.module.css';

const BannerList = ({ banners, handleBannerDelete }) => {
  return (
    <Container className={styles.banner_list}>
      {banners.length > 0 ? (
        banners.map((banner) => (
          <Banner banner={banner} handleNewsItemDelete={handleBannerDelete} key={banner.ID} />
        ))
      ) : (
        <Typography variant="h6" align="center">
          No Banners
        </Typography>
      )}
    </Container>
  );
};

export default BannerList;
