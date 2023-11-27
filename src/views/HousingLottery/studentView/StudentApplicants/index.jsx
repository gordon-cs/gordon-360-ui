import { Button, Card, CardContent, CardHeader, Container, Grid, List, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// eslint-disable-next-line no-unused-vars
import { Dispatch, SetStateAction, useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
// @TODO CSSMODULES - outside directory
import styles from '../../HousingLottery.module.css';

/**
 * Renders a list of selection boxes to choosing preferred halls
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 */
const StudentApplicants = ({
  disabled
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(!emailValue.endsWith('@gordon.edu'));
  };
  

  return (
    <Card>
      <CardHeader title="Student Applicants" className={styles.applicants_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              variant='outlined'
              color='secondary'
              label="First Name"
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
              className={styles.applicants_name}
              helperText={'*Required'}
            />
            <TextField
              type="text"
              variant='outlined'
              color='secondary'
              label="Last Name"
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
              className={styles.applicants_name}
              helperText={'*Required'}
            />
            <TextField
              type="email"
              variant='outlined'
              color='secondary'
              label="Email"
              onChange={handleEmailChange}
              value={email}
              required
              error={emailError}
              helperText={emailError ? 'Not a Valid Gordon Email' : '*Required' }
              className={styles.applicants_email}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ margin: 'auto', display: 'flex' }}
              // disabled={disabled || apartmentChoices?.length >= 5}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              // onClick={onHallAdd}
            >
              Add Applicant
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentApplicants;
