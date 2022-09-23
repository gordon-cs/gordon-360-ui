import { Grid, Typography } from '@material-ui/core/';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';

const RecIM = () => {
  const { profile, loading } = useUser();
  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (loading) {
    return <GordonLoader />;
  }

  if (profile) {
    return (
      <Grid justifyContent="center">
        <Typography variant="subtitle1">Current UserID: {profile.ID}</Typography>
      </Grid>
    );
  }
};
export default RecIM;
