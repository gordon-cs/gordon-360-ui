import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Class } from 'services/peopleSearch';
import user from 'services/user';
import styles from '../../../../../../HousingLottery.module.css';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list item for the apartment applicant list
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 * @param {StudentProfileInfo} props.profile The StudentProfileInfo of the applicant
 * @param {boolean} props.isApplicationEditor boolean indicating whether this list item corresponds to the application editor
 * @param {Function} props.onChangeEditor Callback for change editor button
 * @param {Function} props.onApplicantRemove Callback for remove applicant button
 * @returns {JSX.Element} JSX Element for the applicant list item
 */
const ApplicantListItem = ({
  disabled,
  profile,
  isApplicationEditor,
  onChangeEditor,
  onApplicantRemove,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [hasNickName, setHasNickname] = useState(false);

  useEffect(() => {
    loadAvatar(profile);
    setHasNickname(profile.FirstName !== profile.NickName && profile.NickName !== '');
  }, [profile]);

  /**
   * Creates the Avatar image of the given user
   *
   * @async
   * @function loadAvatar
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the student represented by this list item
   */
  const loadAvatar = async (profile) => {
    try {
      const { def: defaultImage, pref: preferredImage } = await user.getImage(profile.AD_Username);
      setAvatar(preferredImage || defaultImage);
    } catch {
      setAvatar(
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
        </svg>,
      );
    }
  };

  const displayName = hasNickName
    ? `${profile.FirstName} ${profile.LastName} (${profile.NickName})`
    : `${profile.FirstName} ${profile.LastName}`;

  return (
    <Fragment>
      <ListItem
        key={profile.AD_Username}
        component={Link}
        target="_blank"
        to={`/profile/${profile.AD_Username}`}
        className={styles.list_item}
      >
        <ListItemAvatar>
          {avatar ? (
            <Avatar className={styles.avatar} src={`data:image/jpg;base64,${avatar}`} alt="" />
          ) : (
            <Avatar>
              <PersonIcon color="primary" />
            </Avatar>
          )}
        </ListItemAvatar>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={8} sm>
            <ListItemText
              primary={displayName}
              secondary={Class[profile.Class] ?? ''}
              className={styles.list_item}
            />
          </Grid>
        </Grid>
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={0}>
            <Grid item xs>
              <IconButton
                aria-label={isApplicationEditor ? 'current-editor' : 'set-new-editor'}
                disabled={isApplicationEditor || disabled}
                onClick={() => profile && onChangeEditor?.(profile)}
                size="large"
              >
                {isApplicationEditor ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Grid>
            <Grid item xs>
              <IconButton
                aria-label="remove-applicant"
                disabled={isApplicationEditor || disabled}
                onClick={() => profile?.AD_Username && onApplicantRemove?.(profile.AD_Username)}
                size="large"
              >
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default ApplicantListItem;
