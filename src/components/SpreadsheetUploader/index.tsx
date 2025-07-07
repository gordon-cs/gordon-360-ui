import { Paper, Stack, Typography } from '@mui/material';
import { Description as SpreadsheetIcon } from '@mui/icons-material';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { read, utils } from 'xlsx';
import styles from './SpreadsheetUploader.module.css';
import errorLogService from 'services/logging';

const acceptedTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

const displayCell = (cellData: unknown) => {
  if (cellData instanceof Date) {
    return cellData.toLocaleString();
  } else {
    return cellData;
  }
};

type Props = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  onSubmitData: (data: object[] | null | undefined) => void;
  title: string;
  maxColumns: number;
  requiredColumns: string[];
  otherColumns: string[];
  buttonName: string;
  template: string;
};

const SpreadsheetUploader = ({
  open,
  setOpen,
  onSubmitData,
  title,
  maxColumns,
  requiredColumns = [],
  otherColumns = [],
  buttonName,
  template,
}: Props) => {
  const [data, setData] = useState<object[] | null>();
  const [error, setError] = useState<string | null>();

  const handleFileUpload = async ([file]: File[]) => {
    try {
      if (!acceptedTypes.includes(file.type)) {
        throw new Error('The file is not one of the supported file types.');
      }

      const data = await file.arrayBuffer();

      const workbook = read(data, { cellDates: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const uploadedData = utils.sheet_to_json<object>(sheet);

      uploadedData.forEach((row) => {
        let columnNames = Object.keys(row);

        if (columnNames.length > maxColumns) throw new Error('File has too many columns');

        if (columnNames.length < requiredColumns.length)
          throw new Error('File has too few columns');

        if (!requiredColumns.every((column) => columnNames.includes(column)))
          throw new Error('File is missing required columns');

        if (
          columnNames.some(
            (columnName) =>
              !requiredColumns.includes(columnName) && !otherColumns.includes(columnName),
          )
        )
          throw new Error('File contains extra columns');
      });

      setData(uploadedData);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    }
  };

  const dropZone = (
    <>
      <Dropzone onDropAccepted={handleFileUpload} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            <SpreadsheetIcon fontSize="large" className={styles.spreadsheeticon} />
            &nbsp; Upload a Spreadsheet
          </section>
        )}
      </Dropzone>
      <Typography className={styles.dropzone_text} variant="body2">
        Accepted file types: CSV, XLSX
      </Typography>
      {template && (
        <a
          href={template}
          rel="noopener noreferrer"
          target="_blank"
          download
          className={styles.dropzone_templatelink}
        >
          Download Template
        </a>
      )}
    </>
  );

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  return (
    <GordonDialogBox
      open={open}
      title={title}
      buttonName={buttonName}
      buttonClicked={() => {
        onSubmitData(data);
        handleClose();
      }}
      isButtonDisabled={!data}
      cancelButtonClicked={handleClose}
      onClose={handleClose}
    >
      {data ? (
        <>
          <Typography variant="body2" width="60%" className={styles.dataconfirmationmessage}>
            Check over the data below to confirm that it is accurate.
          </Typography>
          <Stack spacing={1} sx={{ maxHeight: '40vb' }}>
            {data.map((row, index) => (
              <Paper key={index} className={styles.dataconfirmationcard}>
                {requiredColumns.map((columnName) =>
                  row[columnName as keyof typeof row] ? (
                    <Typography variant="body2">
                      <b>{columnName}:</b> {displayCell(row[columnName as keyof typeof row])}
                    </Typography>
                  ) : null,
                )}
              </Paper>
            ))}
          </Stack>
        </>
      ) : (
        dropZone
      )}
      <GordonSnackbar
        open={Boolean(error)}
        text={error}
        severity={'error'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setError(null)}
      />
    </GordonDialogBox>
  );
};

export default SpreadsheetUploader;
