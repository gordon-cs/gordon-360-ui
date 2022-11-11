import { Button, Card, Typography } from '@mui/material';
import { Description as SpreadsheetIcon } from '@mui/icons-material';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { read, utils } from 'xlsx';
import styles from './SpreadsheetUploader.module.css';

const acceptedTypes = ['application/vnd.ms-excel', 'text/csv'];

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
}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  const onDropAccepted = (fileList) => {
    const file = fileList[0];
    if (!acceptedTypes.includes(file.type)) {
      setError('The file is not one of the supported file types.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target.result;
      const workbook = read(data, {
        type: 'binary',
      });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const uploadedData = utils.sheet_to_row_object_array(sheet);

      uploadedData.forEach((row) => {
        let columnNames = Object.keys(row);

        if (error) return;

        if (columnNames.length > maxColumns) setError('File has too many columns');
        if (columnNames.length < requiredColumns.length) setError('File has too few columns');
        if (requiredColumns.some((column) => !columnNames.includes(column)))
          setError('File is missing required columns');
        if (
          columnNames.some(
            (columnName) =>
              !requiredColumns.includes(columnName) && !otherColumns.includes(columnName),
          )
        )
          setError('File contains extra columns');
      });

      if (error) return;

      setData(uploadedData);
    };

    reader.onerror = function (event) {
      console.error('File could not be read! Code ' + event.target.error.code);
    };

    reader.readAsBinaryString(file);
  };

  const dropZone = (
    <>
      <Dropzone onDropAccepted={(files) => onDropAccepted(files)} multiple={false}>
        {({ getRootProps, getInputProps }) => {
          return (
            <section className={styles.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <SpreadsheetIcon fontSize="large" className={styles.spreadsheeticon} />
              &nbsp; Upload a Spreadsheet
            </section>
          );
        }}
      </Dropzone>
      <Typography className={styles.dropzone_text} variant="body2">
        Accepted file types: CSV, XLSX
      </Typography>
      {template ? (
        <Link to={template} target="_blank" download className={styles.dropzone_templatelink}>
          Download Template
        </Link>
      ) : null}
    </>
  );

  return (
    <GordonDialogBox
      open={open}
      title={title}
      cancelButtonClicked={() => {
        setOpen(false);
      }}
      onClose={() => {
        setOpen(false);
      }}
    >
      {data ? (
        <>
          <Button
            variant="contained"
            onClick={() => {
              onSubmitData(data);
              setOpen(false);
              setData(null);
            }}
            color="primary"
            disabled={!data}
            style={{ marginTop: '5px' }}
          >
            {buttonName}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              setData(null);
            }}
          >
            Cancel
          </Button>
          <Typography variant="body2" width="60%" className={styles.dataconfirmationmessage}>
            Check over the data below to confirm that it is accurate.
          </Typography>
        </>
      ) : null}
      {data
        ? data.map((row, index) => {
            return (
              <Card key={index} className={styles.dataconfirmationcard}>
                {requiredColumns.map((columnName) =>
                  row[columnName] ? (
                    <Typography variant="body2">
                      <b>{columnName}:</b> {row[columnName]}
                    </Typography>
                  ) : null,
                )}
              </Card>
            );
          })
        : dropZone}
      <GordonSnackbar
        open={error}
        text={error}
        severity={'error'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setError(null)}
      />
    </GordonDialogBox>
  );
};

export default SpreadsheetUploader;
