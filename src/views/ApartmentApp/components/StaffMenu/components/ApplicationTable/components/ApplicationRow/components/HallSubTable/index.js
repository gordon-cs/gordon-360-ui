import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core/';

const HallSubTable = ({ apartmentChoices }) => (
  <Box margin={1}>
    <Toolbar className={styles.stylized_table_toolbar} disableGutters>
      <Typography variant="h6" gutterBottom component="div">
        Preferred Halls
      </Typography>
    </Toolbar>
    <Table size="small" aria-label="halls" className={styles.sub_table}>
      <TableHead className={styles.stylized_table_head}>
        <TableRow>
          <TableCell align="right">Rank</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className={styles.striped_table}>
        {apartmentChoices.map((apartmentChoice) => (
          <TableRow key={apartmentChoice.HallName}>
            <TableCell align="right">{apartmentChoice.HallRank}</TableCell>
            <TableCell>{apartmentChoice.HallName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default HallSubTable;
