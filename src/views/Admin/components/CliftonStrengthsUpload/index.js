import {
  Button,
  Card,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { gordonColors } from 'theme';
import GordonLoader from '../../../../components/Loader';
import SpreadsheetUploader from '../../../../components/SpreadsheetUploader';
import CliftonStrengthsService from '../../../../services/cliftonStrengths';
import CliftonStrengthsUploadTemplate from './cliftonStrengthsUploadTemplate.csv';

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
};

const successResults = ['Success', 'Added', 'Modified'];

const CliftonStrengthsUpload = () => {
  const [isSpreadsheetUploaderOpen, setIsSpreadsheetUploaderOpen] = useState(false);
  const [uploadResults, setUploadResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitStrengths = (uploadedData) => {
    setLoading(true);
    uploadedData.forEach((cs) => {
      let days = cs.DateCompleted;
      cs.DateCompleted = DateTime.fromFormat('01-01-1900', 'MM-dd-yyyy')
        .plus({ days: days })
        .toISODate();
    });

    CliftonStrengthsService.postCliftonStrengths(uploadedData).then((data) => {
      setUploadResults(
        <Table>
          <TableHead>
            <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
              Results:
            </Typography>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Access Code</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Row State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== []
              ? data.map((r, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{ fontSize: '1rem' }}>{r.Email}</TableCell>
                    <TableCell style={{ fontSize: '1rem' }}>{r.AccessCode}</TableCell>
                    <TableCell
                      style={{
                        backgroundColor: successResults.some((s) => s === r.RowState)
                          ? gordonColors.secondary.greenShades.secondary
                          : gordonColors.secondary.red,
                        color: 'white',
                        fontSize: '1rem',
                      }}
                    >
                      {r.RowState}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>,
      );
      setLoading(false);
    });
  };

  return (
    <>
      <Card>
        <CardHeader style={headerStyle} align="center" title={`Clifton Strengths`} />
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsSpreadsheetUploaderOpen(true)}
            style={{ margin: '50px auto' }}
          >
            Upload Clifton Strengths
          </Button>
        </Grid>
        {loading ? (
          <>
            <GordonLoader />
            <div style={{ height: '10px' }}></div>
          </>
        ) : (
          uploadResults
        )}
      </Card>
      <SpreadsheetUploader
        open={isSpreadsheetUploaderOpen}
        setOpen={setIsSpreadsheetUploaderOpen}
        onSubmitData={handleSubmitStrengths}
        title="Clifton Strengths Upload"
        requiredColumns={[
          'Email',
          'DateCompleted',
          'Theme1',
          'Theme2',
          'Theme3',
          'Theme4',
          'Theme5',
          'AccessCode',
        ]}
        buttonName="Upload Strengths"
        template={CliftonStrengthsUploadTemplate}
      ></SpreadsheetUploader>
    </>
  );
};

export default CliftonStrengthsUpload;
