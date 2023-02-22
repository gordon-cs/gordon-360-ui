import { Cancel as XCircle, CheckCircle } from '@mui/icons-material';
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
} from '@mui/material';
import GordonLoader from 'components/Loader/Loader';
import SpreadsheetUploader from 'components/SpreadsheetUploader/SpreadsheetUploader';
import { addDays, parseISO } from 'date-fns';
import { useState } from 'react';
import CliftonStrengthsService from 'services/cliftonStrengths';
import styles from './CliftonStrengthsUpload.module.scss';
import templateUrl from './cliftonStrengthsUploadTemplate.csv?url';

const successResults = ['Success', 'Added', 'Modified'];

const initDate = parseISO('1900-01-01T00:00:00');

const CliftonStrengthsUpload = () => {
  const [isSpreadsheetUploaderOpen, setIsSpreadsheetUploaderOpen] = useState(false);
  const [uploadResults, setUploadResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitStrengths = (uploadedData) => {
    setLoading(true);

    let formattedData = uploadedData.map((cs) => {
      // The date completed value comes out of the
      // spreadsheet uploader as a number of days since 1/1/1900.
      let days = cs['Date Completed'];
      cs['Date Completed'] = addDays(initDate, days).toISOString();

      return {
        AccessCode: cs['Access Code'],
        Email: cs.Email,
        DateCompleted: cs['Date Completed'],
        Themes: [cs.Theme_1, cs.Theme_2, cs.Theme_3, cs.Theme_4, cs.Theme_5],
        Private: false,
      };
    });

    CliftonStrengthsService.postCliftonStrengths(formattedData)
      .then((data) => {
        setUploadResults(
          data.map((uploadResult, index) => {
            const uploadResultSuccess = successResults.some((s) => s === uploadResult.UploadResult);
            return (
              <TableRow key={index}>
                <TableCell className={styles.cell}>{uploadResult.Email}</TableCell>
                <TableCell className={styles.cell}>{uploadResult.AccessCode}</TableCell>
                <TableCell
                  className={
                    uploadResultSuccess ? styles.resultmessage_green : styles.resultmessage_red
                  }
                >
                  {uploadResultSuccess ? (
                    <CheckCircle style={{ color: '#009900' }} />
                  ) : (
                    <XCircle style={{ color: '#B53228' }} />
                  )}
                  &nbsp;
                  {uploadResult.UploadResult}
                </TableCell>
              </TableRow>
            );
          }),
        );
        setLoading(false);
      })
      .catch((error) => {
        setUploadResults(<h1>An Error has occurred while uploading.</h1>);
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <CardHeader className={styles.header} align="center" title="Clifton Strengths" />
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsSpreadsheetUploaderOpen(true)}
            className={styles.uploadbutton}
          >
            Upload Clifton Strengths
          </Button>
        </Grid>
        {loading ? (
          <div className={styles.gordonloadercontainer}>
            <GordonLoader />
          </div>
        ) : (
          uploadResults && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.headercell}>Email</TableCell>
                  <TableCell className={styles.headercell}>Access Code</TableCell>
                  <TableCell className={styles.headercell}>Upload Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{uploadResults}</TableBody>
            </Table>
          )
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
        template={templateUrl}
      />
    </>
  );
};

export default CliftonStrengthsUpload;
