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
import GordonLoader from 'components/Loader';
import SpreadsheetUploader from 'components/SpreadsheetUploader';
import { useState } from 'react';
import CliftonStrengthsService from 'services/cliftonStrengths';
import styles from './CliftonStrengthsUpload.module.scss';
import templateUrl from './cliftonStrengthsUploadTemplate.csv?url';

const successResults = ['Success', 'Added', 'Modified'];

const CliftonStrengthsUpload = () => {
  const [isSpreadsheetUploaderOpen, setIsSpreadsheetUploaderOpen] = useState(false);
  const [uploadResults, setUploadResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitStrengths = (uploadedData) => {
    setLoading(true);

    const formattedData = uploadedData.map((cs) => ({
      AccessCode: cs['Access Code'],
      Email: cs.Email,
      DateCompleted: cs['Date Completed'].toISOString(),
      Themes: [cs.Theme_1, cs.Theme_2, cs.Theme_3, cs.Theme_4, cs.Theme_5],
      Private: false,
    }));

    CliftonStrengthsService.postCliftonStrengths(formattedData)
      .then(setUploadResults)
      .catch(() => setUploadResults(<h1>An Error has occurred while uploading.</h1>))
      .finally(() => setLoading(false));
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
              <TableBody>
                {uploadResults.map((uploadResult, index) => {
                  const uploadResultSuccess = successResults.some(
                    (s) => s === uploadResult.UploadResult,
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell className={styles.cell}>{uploadResult.Email}</TableCell>
                      <TableCell className={styles.cell}>{uploadResult.AccessCode}</TableCell>
                      <TableCell
                        className={
                          uploadResultSuccess
                            ? styles.resultmessage_green
                            : styles.resultmessage_red
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
                })}
              </TableBody>
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
          'Date Completed',
          'Theme_1',
          'Theme_2',
          'Theme_3',
          'Theme_4',
          'Theme_5',
          'Access Code',
        ]}
        otherColumns={['Last Name', 'First Name', 'Status']}
        buttonName="Upload Strengths"
        template={templateUrl}
      />
    </>
  );
};

export default CliftonStrengthsUpload;
