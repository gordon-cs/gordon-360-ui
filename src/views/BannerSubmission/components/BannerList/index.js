import { Container, Typography } from '@material-ui/core';
import Banner from '../Banner';

const BannerList = ({ banners, handleBannerDelete }) => {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
