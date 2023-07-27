import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { Class, SearchResult } from 'services/peopleSearch';
import { useWindowSize } from 'hooks';
import userService from 'services/user';
import styles from './PeopleSearchResult.module.css';

/* Const string was created with https://png-pixel.com/ .
 * This is a single pixel image of neutral gray (#808080) with 15% opacity.  This works
 * well with both light and dark mode.
 */
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';
const JPG_BASE64_HEADER = 'data:image/jpg;base64,';
const breakpointWidth = 810;

const SecondaryText = ({
  children,
  ...otherProps
}: {
  children: ReactNode;
  [props: string]: any;
}) => (
  <Typography variant="body2" color="textSecondary" {...otherProps}>
    {children}
  </Typography>
);

interface Props {
  person: SearchResult;
  lazyLoadAvatar: boolean;
}

const PeopleSearchResult = ({ person, lazyLoadAvatar }: Props) => {
  const [avatar, setAvatar] = useState<string | null>(
    person.AD_Username ? COLOR_80808026_1X1 : null,
  );
  const [hasBeenRun, setHasBeenRun] = useState(false);
  const [width] = useWindowSize();
  const navigate = useNavigate();
  const isMobileView = width < breakpointWidth;

  const loadAvatar = useCallback(async () => {
    if (person.AD_Username) {
      const { def: defaultImage, pref: preferredImage } = await userService.getImage(
        person.AD_Username,
      );
      setAvatar(JPG_BASE64_HEADER + (preferredImage || defaultImage));
    }
    setHasBeenRun(true);
  }, [person.AD_Username]);

  useEffect(() => {
    if (!lazyLoadAvatar && !hasBeenRun) {
      loadAvatar();
    }
  }, [hasBeenRun, lazyLoadAvatar, loadAvatar]);

  const handleVisibilityChange = (isVisible: boolean) => {
    if (lazyLoadAvatar && isVisible && !hasBeenRun) loadAvatar();
  };

  const fullName = `${person.FirstName} ${person.LastName}`;
  const nickname =
    person?.NickName && person.NickName !== person.FirstName ? `(${person.NickName})` : null;
  const maidenName =
    person?.MaidenName && person.MaidenName !== person.LastName ? `(${person.MaidenName})` : null;

  let classOrJobTitle,
    mailLocation = '';
  switch (person.Type) {
    case 'Student':
      classOrJobTitle = Class[person.Class];
      mailLocation = `Mailbox #${person.Mail_Location}`;
      break;

    case 'Faculty':
    case 'Staff':
      classOrJobTitle = person.JobTitle;
      mailLocation = `Mailstop: ${person.Mail_Location}`;
      break;

    default:
      break;
  }

  const emailIcon = person.Email
    ? !isMobileView && (
        <div className={styles.mailing_icon_container}>
          <CardActionArea className={styles.mail_card_action}>
            <a href={`mailto:${person.Email}`}>
              <MailOutlineIcon className={styles.mail_outline} />
            </a>
          </CardActionArea>
        </div>
      )
    : null;

  return (
    <>
      <VisibilitySensor onChange={handleVisibilityChange}>
        <Card className={styles.result_container} elevation={0}>
          <Link
            className={`gc360_link ${styles.profile_link_container}`}
            to={`/profile/${person.AD_Username}`}
          >
            <Card className={styles.result} elevation={0}>
              {avatar && (
                <CardMedia
                  src={avatar}
                  title={fullName}
                  component="img"
                  className={styles.avatar}
                />
              )}
              <CardContent>
                <Typography variant="h5" className={styles.name}>
                  {person.FirstName} {nickname} {person.LastName} {maidenName}
                </Typography>
                <Typography className={styles.subtitle}>
                  {classOrJobTitle ?? person.Type}
                  {person.Type === 'Alumni' && person.PreferredClassYear
                    ? ' ' + person.PreferredClassYear
                    : null}
                </Typography>
                <SecondaryText className={styles.secondary_text}>
                  {(person.Type === 'Student' || person.Type === 'Alumni') && (
                    <>
                      {person.Major1Description}
                      {person.Major2Description
                        ? (person.Major1Description ? ', ' : '') + `${person.Major2Description}`
                        : null}
                      {person.Type === 'Student' && person.Major3Description
                        ? `, ${person.Major3Description}`
                        : null}
                    </>
                  )}
                </SecondaryText>
                <SecondaryText className={styles.secondary_text}>{person.Email}</SecondaryText>
                <SecondaryText className={styles.secondary_text}>{mailLocation}</SecondaryText>
              </CardContent>
            </Card>
          </Link>
          {emailIcon}
        </Card>
      </VisibilitySensor>
      <Divider />
    </>
  );
};

export default PeopleSearchResult;
