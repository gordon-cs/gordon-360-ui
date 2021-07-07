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
    <Toolbar className="stylized-table-toolbar" disableGutters>
      <Typography variant="h6" gutterBottom component="div">
        Preferred Halls
      </Typography>
    </Toolbar>
    <Table size="small" aria-label="halls" className="sub-table">
      <TableHead className="stylized-table-head">
        <TableRow>
          <TableCell align="right">Rank</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="striped-table">
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
