import {
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
// @TODO CSSMODULES - outside directory
import styles from '../../../../../../ApartmentApp.module.css';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list item for the apartment off-campus program list
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 * @param {number} props.index The index of this list item
 * @param {StudentProfileInfo} props.profile The StudentProfileInfo of the applicant
 * @param {string} props.offCampusProgram The name of the department of the off-campus program
 * @param {string[]} props.departments Array of departments available
 * @param {Function} props.onOffCampusInputChange Callback for dropdown menu change
 * @returns {JSX.Element} JSX Element for the off-campus program list
 */
const OffCampusListItem = ({
  disabled,
  index,
  profile,
  offCampusProgram,
  departments,
  onOffCampusInputChange,
}) => {
  const [hasNickName, setHasNickname] = useState(false);
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  useEffect(
    () => setHasNickname(profile.FirstName !== profile.NickName && profile.NickName !== ''),
    [profile],
  );

  useEffect(
    () =>
      setIsSelectionValid(
        offCampusProgram === '' ||
          departments.some((departmentName) => departmentName === offCampusProgram),
      ),
    [offCampusProgram, departments],
  );

  const departmentOptions = departments.map((departmentName) => (
    <MenuItem value={departmentName} key={departmentName}>
      {departmentName}
    </MenuItem>
  ));

  const displayName = hasNickName
    ? `${profile.FirstName} ${profile.LastName} (${profile.NickName})`
    : `${profile.FirstName} ${profile.LastName}`;

  return (
    <Fragment>
      <ListItem key={profile.AD_Username} className={styles.list_item}>
        <Grid container alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm={4}>
            <ListItemText
              primary={displayName ?? profile.AD_Username}
              className={styles.list_item}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth error={!isSelectionValid}>
              <InputLabel shrink>Department</InputLabel>
              <Select
                disabled={disabled}
                value={isSelectionValid ? offCampusProgram : ''}
                onChange={(event) => onOffCampusInputChange(String(event.target.value), index)}
                input={<Input id={'department' + index} />}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {departmentOptions}
              </Select>
              {!isSelectionValid && (
                <FormHelperText>
                  An error occurred while loading the application data
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </Fragment>
  );
};

export default OffCampusListItem;
