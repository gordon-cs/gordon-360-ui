import { Divider, ListItem, Grid, Typography } from '@mui/material';
import styles from './ProfileInfoListItem.module.css';

const ProfileInfoListItem = ({
  title,
  contentText,
  ContentIcon = null,
  privateInfo = false,
  myProf = false,
}) => {
  const gridSizeProps = ContentIcon ? { xs: 4, md: 3, lg: 4 } : { xs: 7 };

  return (
    <>
      <ListItem className={styles.profile_info_list_item}>
        <Grid container alignItems="center">
          <Grid container item xs={5} alignItems="center">
            <Typography>{title}</Typography>
          </Grid>
          <Grid
            container
            item
            {...gridSizeProps}
            alignItems="center"
            className={privateInfo ? (myProf ? styles.private : styles.privateNotMine) : null}
          >
            {contentText}
          </Grid>
          {ContentIcon && (
            <Grid container item xs={3} md={4} lg={3} justifyContent="center">
              {ContentIcon}
            </Grid>
          )}
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ProfileInfoListItem;
