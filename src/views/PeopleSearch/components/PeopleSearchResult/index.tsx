import {
  Divider,
  Grid,
  GridItemsAlignment,
  GridJustification,
  GridSize,
  Typography,
} from '@material-ui/core';
import { ReactNode, useCallback, useEffect, useState } from 'react';
// @ts-ignore
import IMG from 'react-graceful-image';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { Class, SearchResult } from 'services/peopleSearch';
import userService from 'services/user';
import styles from './PeopleSearchResult.module.css';

/*Const string was created with https://png-pixel.com/ .
 *It is a 1 x 1 pixel with the same color as gordonColors.neutral.lightGray (7/9/21)
 *Although this doesn't use the gordonColors themes directly,
 *the end result is much cleaner and faster than using the placeholderColor tag of react-graceful-image.
 */
const GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/erVfwAJRwPA/3pinwAAAABJRU5ErkJggg==';
const JPG_BASE64_HEADER = 'data:image/jpg;base64,';

const SecondaryText = ({ children, otherProps }: { children: ReactNode; otherProps?: any }) => (
  <Typography variant="body2" color="textSecondary" {...otherProps}>
    {children}
  </Typography>
);

interface Props {
  person: SearchResult;
  size: 'single' | 'largeImages' | 'full';
  lazyImages: boolean;
}

const PeopleSearchResult = ({ person, size, lazyImages }: Props) => {
  const [avatar, setAvatar] = useState(GORDONCOLORS_NEUTRAL_LIGHTGRAY_1X1);
  const [hasBeenRun, setHasBeenRun] = useState(false);

  const loadAvatar = useCallback(async () => {
    const { def: defaultImage, pref: preferredImage } = await userService.getImage(
      person.AD_Username,
    );

    if (person.AD_Username) {
      setAvatar(JPG_BASE64_HEADER + (preferredImage || defaultImage));
    }
    setHasBeenRun(true);
  }, [person.AD_Username]);

  useEffect(() => {
    if (!lazyImages && !hasBeenRun) {
      loadAvatar();
    }
  }, [person.AD_Username, hasBeenRun, lazyImages, loadAvatar]);

  const handleVisibilityChange = (isVisible: boolean) => {
    if (lazyImages && isVisible && !hasBeenRun) loadAvatar();
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

  let className: string;
  let gridProps: {
    xs?: GridSize;
    container?: boolean;
    alignItems?: GridItemsAlignment;
    justifyContent?: GridJustification;
  };
  switch (size) {
    case 'single':
      className = styles.people_search_avatar_mobile;
      gridProps = {};
      break;
    case 'largeImages':
      className = styles.people_search_avatar_large;
      gridProps = { xs: 4, container: true, justifyContent: 'flex-end' };
      break;
    default:
      className = styles.people_search_avatar;
      gridProps = { xs: 5, container: true, alignItems: 'center' };
      break;
  }

  return (
    <VisibilitySensor onChange={handleVisibilityChange}>
      <>
        <Link className="gc360_link" to={`profile/${person.AD_Username}`}>
          <Grid
            container
            alignItems="center"
            justifyContent={size !== 'full' ? 'center' : undefined}
            spacing={2}
            style={{
              padding: '1rem',
            }}
          >
            <Grid item {...gridProps}>
              <IMG
                className={className}
                src={avatar}
                alt={'Profile picture for ' + fullName}
                noLazyLoad="true"
                noPlaceHolder="true"
              />
              {size === 'full' && (
                <div>
                  <Typography>
                    {person.FirstName} {nickname} {person.LastName} {maidenName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {person.Email?.includes('.') ? person.Email : null}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={size === 'full' ? 5 : 8}>
              {size !== 'full' && (
                <Typography variant="h5">
                  {person.FirstName} {nickname} {person.LastName} {maidenName}
                </Typography>
              )}
              <Typography>
                {classOrJobTitle ?? person.Type}
                {person.Type === 'Alumni' && person.PreferredClassYear
                  ? ' ' + person.PreferredClassYear
                  : null}
              </Typography>
              <SecondaryText>
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
              {size !== 'full' && (
                <>
                  <SecondaryText>{person.Email}</SecondaryText>
                  <SecondaryText>{mailLocation}</SecondaryText>
                </>
              )}
            </Grid>
            {size === 'full' && (
              <Grid item xs={2}>
                <Typography>{mailLocation}</Typography>
              </Grid>
            )}
          </Grid>
        </Link>
        <Divider />
      </>
    </VisibilitySensor>
  );
};

export default PeopleSearchResult;
