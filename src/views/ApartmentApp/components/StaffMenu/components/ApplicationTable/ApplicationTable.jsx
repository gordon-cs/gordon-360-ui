import { useState } from 'react';
import { orderBy } from 'lodash';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material/';
import ApplicationTableHead from './components/ApplicationTableHead/ApplicationTableHead';
import ApplicationRow from './components/ApplicationRow/ApplicationRow';
import styles from './ApplicationTable.module.css';

const ApplicationsTable = ({ applications }) => {
  const [order, setOrder] = useState('asc');
  const [iteratee, setIteratee] = useState('ApplicationID');

  const handleRequestSort = (_event, property) => {
    const isAsc = iteratee === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setIteratee(property);
  };

  return (
    <Card>
      <CardHeader title="Apartment Applications" className={styles.apartment_card_header} />
      <CardContent>
        {applications?.length > 0 ? (
          <TableContainer>
            <Table stickyHeader>
              <ApplicationTableHead
                order={order}
                iteratee={iteratee}
                onRequestSort={handleRequestSort}
              />
              <TableBody className={styles.double_striped_table}>
                {orderBy(applications, [iteratee], [order]).map((applicationDetails, index) => (
                  <ApplicationRow
                    key={applicationDetails.ApplicationID}
                    applicationDetails={applicationDetails}
                    labelId={`application-table-${index}`}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1">
            Could not load any applications for the current semester.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
