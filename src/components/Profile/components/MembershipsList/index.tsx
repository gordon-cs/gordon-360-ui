import {
  AlertColor,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  Typography,
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import membershipService, { MembershipHistory } from 'services/membership';
import MembershipInfoCard from './components/MembershipInfoCard';
import styles from './MembershipsList.module.css';

type Props = {
  username: string;
  myProf: boolean;
  PersonType?: string;
  createSnackbar: (message: string, severity: AlertColor) => void;
};

/**
 * A List of memberships for display on the Profile and MyProfile views.
 *
 * @param {Object} props The component props
 * @param {string} props.username Username of the profile being viewed
 * @param {boolean} props.myProf Whether this is shown in MyProfile or not
 * @param {Function} props.createSnackbar function to create a snackbar of whether an operation succeeded
 * @returns {JSX} A list of the user's memberships
 */
const MembershipsList = ({ username, myProf, createSnackbar }: Props) => {
  const [loading, setLoading] = useState(true);
  const [membershipHistories, setMembershipHistories] = useState<MembershipHistory[]>([]);

  useEffect(() => {
    async function loadMemberships() {
      setLoading(true);
      const memberships = await membershipService.groupByActivityCode(username);
      setMembershipHistories(memberships);

      setLoading(false);
    }
    loadMemberships();
  }, [myProf, username]);

  const MembershipsList = () => {
    if (membershipHistories.length === 0) {
      return (
        <Link to={`/involvements`}>
          <Typography
            variant="body2"
            className={`gc360_text_link ${styles.noMemberships}`}
            align="center"
          >
            No Involvements to display. Click here to see Involvements around campus!
          </Typography>
        </Link>
      );
    } else {
      return (
        <>
          {membershipHistories.map((membership) => (
            <MembershipInfoCard
              myProf={myProf}
              membershipHistory={membership}
              key={membership.ActivityCode}
              createSnackbar={createSnackbar}
            />
          ))}
        </>
      );
    }
  };

  if (loading) {
    return <GordonLoader />;
  }

  const transcriptButton = myProf && (
    <Grid container justifyContent="center">
      <Link to="/transcript">
        <Button variant="contained" color="secondary">
          Experience Transcript
        </Button>
      </Link>
    </Grid>
  );
  const noteInfo = myProf && (
    <div className={styles.memberships_card_note}>
      <Typography>
        NOTE: Shaded areas are visible only to you and other members of the same club session.
      </Typography>
    </div>
  );

  return (
    <>
      <Grid item xs={12} className={styles.memberships}>
        <Grid container className={styles.memberships_header}>
          <CardHeader title="Involvements" />
        </Grid>
        <Card className={styles.memberships_card}>
          <CardContent className={styles.memberships_card_content}>
            {transcriptButton}
            <List>
              <MembershipsList />
              {noteInfo}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default MembershipsList;
