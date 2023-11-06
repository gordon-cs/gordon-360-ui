import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import StarBorder from '@mui/icons-material/StarBorder';
import GordonQuickSearch from 'components/Header/components/QuickSearch';
import { useState } from 'react';
// @TODO CSSMODULES - outside directory
import styles from '../../../../HousingLottery.module.css';
import ApplicantListItem from './components/ApplicantListItem/index.jsx';


/**
 * @typedef { import('services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('services/housing').ApplicationDetails } ApplicationDetails
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list of applicants, displayed by name, username, and class standing.
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list
 * @param {StudentProfileInfo} props.editorProfile The StudentProfileInfo of the application editor
 * @param {ApartmentApplicant[]} props.applicants Array of applicant info
 * @param {Function} props.onSearchSubmit Callback for apartment people search submission
 * @param {Function} props.onChangeEditor Callback for change editor button
 * @param {Function} props.onApplicantRemove Callback for remove applicant button
 * @returns {JSX.Element} JSX Element for the applicant list
 */
const ApplicantList = ({
  disabled,
  editorProfile,
  applicants,
  onSearchSubmit,
  onChangeEditor,
  onApplicantRemove,
}) => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <Card>
      <CardHeader title="Student Applicants" className={styles.apartment_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className={styles.applicant_list} aria-label="apartment applicants">
              {applicants?.length > 0 ? (
                applicants.map((applicant) => (
                  <ApplicantListItem
                    key={applicant.Profile.AD_Username}
                    disabled={disabled}
                    profile={applicant.Profile}
                    isApplicationEditor={
                      applicant.Profile.AD_Username === editorProfile.AD_Username
                    }
                    onChangeEditor={onChangeEditor}
                    onApplicantRemove={onApplicantRemove}
                  />
                ))
              ) : (
                <ListItem key={'applicant-list-placeholder'} className={styles.list_item}>
                  <ListItemText
                    primary={'If you are reading this, something went wrong. Please contact CTS'}
                    className={styles.list_item}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Grid item xs={9} sm={5} className={styles.people_search_parent}>
              <GordonQuickSearch
                disableLink
                customPlaceholderText={'Add Applicant'}
                onSearchSubmit={(selectedUsername) => disabled || onSearchSubmit(selectedUsername)}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicantList;
