import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core/';

const HallSubTable = ({ apartmentChoices }) => (
  <Box margin={1}>
    <Typography variant="h6" gutterBottom component="div">
      Preferred Halls
    </Typography>
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell align="right">Rank</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
