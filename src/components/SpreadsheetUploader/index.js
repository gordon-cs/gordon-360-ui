import { Button, Card, Typography } from '@material-ui/core';
import GordonSnackbar from 'components/Snackbar';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './SpreadsheetUploader.module.css';

const SpreadsheetUploader = ({ open, onSubmitData }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const onDropAccepted = (fileList) => {
    var file = fileList[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      const file = event.target.result.replace('ï»¿', '');
      const lines = file.split('\r\n');
      const headers = lines[0].split(',');
      if (
        headers[0] !== 'Username' ||
        headers[1] !== 'Participation' ||
        headers[2] !== 'Title/Comment'
      ) {
        setError('Please use the template to assure you have the correct format.');
      }
      lines.splice(0, 1);
      let rowCount = 1;
      let uploadedData = lines.map((line) => {
        let columnCount = 0;
        let cells = line.split(',');
        let row = { id: rowCount };
        cells.map((cell) => {
          row[headers[columnCount]] = cell;
          columnCount++;
          return true;
        });
        rowCount++;
        return row;
      });
      setData(uploadedData);
      console.log(uploadedData);
    };
    reader.readAsBinaryString(file);
  };

  const onDropRejected = () => {
    console.log('REJECTED');
  };

  const downloadTemplate = () => {};

  const dropZone = (
    <>
      <Dropzone
        onDropAccepted={(files) => onDropAccepted(files)}
        onDropRejected={onDropRejected}
        accept=" application/vnd.ms-excel, text/csv"
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className={styles.gc360_spreadsheet_dialog_content_dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              Upload .CSV File
            </div>
          </section>
        )}
      </Dropzone>
      <Button onClick={downloadTemplate}>Download Template</Button>
    </>
  );

  useEffect(() => {
    setData(null);
  }, [error]);

  return error ? (
    <>
      <GordonSnackbar
        open={error}
        text={error}
        severity={'error'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setError(null)}
      />
      {dropZone}
    </>
  ) : data ? (
    <div style={{ maxHeight: 300, overflowY: 'auto', overflowX: 'visible' }}>
      {data.map((row) => {
        const title = row['Title/Comment'] ? (
          <>
            <Typography variant="p">
              <b>Title:</b> {row['Title/Comment']}
            </Typography>
            <br />
          </>
        ) : null;
        const part = row.Participation ? (
          <>
            <Typography variant="p">
              <b>Participation:</b> {row.Participation}
            </Typography>
          </>
        ) : null;
        return (
          <Card style={{ padding: '10px', lineHeight: '1.6em', margin: '10px 0px' }}>
            <Typography color="primary" variant="h6">
              {row.Username}
            </Typography>
            {title}
            {part}
          </Card>
        );
      })}
    </div>
  ) : (
    dropZone
  );
};

export default SpreadsheetUploader;
