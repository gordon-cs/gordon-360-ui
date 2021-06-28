import { useEffect, useState } from 'react';
import { gordonColors } from 'theme';
import GordonLoader from 'components/Loader';
import activity from 'services/activity';
import session from 'services/session';
import InvolvementStatusListItem from './components/InvolvementStatusList/index';
import { Typography, Card, CardHeader } from '@material-ui/core';
import { NotFoundError } from 'services/error';

const InvolvementStatusList = ({ status }) => {
  const [loading, setLoading] = useState(true);
  const [involvements, setInvolvements] = useState([]);
  const [currentSession, setCurrentSession] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      const { SessionCode } = await session.getCurrent();
      setCurrentSession(SessionCode);
    };
    loadSession();
  }, []);

  useEffect(() => {
    const loadInvolvements = async () => {
      try {
        setLoading(true);
        if (status === 'Open') {
          setInvolvements(await activity.getOpen());
        } else {
          setInvolvements(await activity.getClosed());
        }
      } catch (err) {
        if (err instanceof NotFoundError) {
          setInvolvements([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadInvolvements();
  }, [status]);

  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
  };

  return (
    <Card>
      <CardHeader style={headerStyle} align="center" title={`${status} Involvements`} />
      {loading ? (
        <GordonLoader />
      ) : involvements.length > 0 ? (
        involvements.map((involvement) => (
          <InvolvementStatusListItem
            key={involvement.ActivityCode}
            involvement={involvement}
            session={currentSession}
          />
        ))
      ) : (
        <Typography align="center" variant="h5">
          No {status} Involvements To Show
        </Typography>
      )}
    </Card>
  );
};

export default InvolvementStatusList;
