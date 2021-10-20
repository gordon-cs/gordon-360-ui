import { Button, Card, Typography } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from './SpreadsheetUploader.module.css';
import XLSX from 'xlsx';
import SpreadsheetSVG from './spreadsheet.svg';
import GordonDialogBox from 'components/GordonDialogBox';
import { SettingsPowerRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';

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
  const [isDataLoading, setIsDataLoading] = useState(false);

  const acceptedTypes = ['application/vnd.ms-excel', 'text/csv'];

  const onDropAccepted = (fileList) => {
    //setIsDataLoading((o) => !o);
    let file = fileList[0];
    if (!acceptedTypes.includes(file.type)) {
      setError('The file is not one of the supported file types.');
      return;
    }
    //if (file.)
    let reader = new FileReader();
    reader.onload = function (event) {
      let data = event.target.result;
      let workbook = XLSX.read(data, {
        type: 'binary',
      });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];

      let uploadedData = XLSX.utils.sheet_to_row_object_array(sheet);
      let properties = Object.keys(uploadedData[0]);

      /* For each row:
          If the column count is less than required or greater than max
          OR if there are some required columns not in the row
          OR if there are some columns in the row that are not allowed in the object
      */
      if (
        uploadedData.some((row) => {
          let keys = Object.keys(row);
          return (
            keys.length > maxColumns ||
            keys.length < requiredColumns.length ||
            requiredColumns.some((column) => !keys.includes(column)) ||
            keys.some((key) => !requiredColumns.includes(key) && !otherColumns.includes(key))
          );
        })
      ) {
        setError('Please make sure your file matches the template file.');
        return;
      }

      setData(uploadedData);
    };

    reader.onerror = function (event) {
      console.error('File could not be read! Code ' + event.target.error.code);
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {};

  const dropZone = (
    <>
      <Dropzone onDropAccepted={(files) => onDropAccepted(files)} multiple={false}>
        {({ getRootProps, getInputProps }) => {
          return (
            <section>
              <div className={styles.gc360_spreadsheet_dialog_content_dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={SpreadsheetSVG} style={{ width: 40 }} />
                Upload a Spreadsheet
              </div>
            </section>
          );
        }}
      </Dropzone>
      <Typography style={{ textAlign: 'center', fontSize: 10 }} variant="p">
        Accepted file types: CSV, XLSX
      </Typography>
      {template ? (
        <Link
          to={template}
          target="_blank"
          download
          style={{ color: gordonColors.primary.blue, textAlign: 'center' }}
        >
          Download Template
        </Link>
      ) : null}
    </>
  );

  useEffect(() => {
    if (error) {
      setData(null);
    }
  }, [error]);

  //useEffect(() => setIsDataLoading(false),[data]);

  return (
    <>
      <GordonDialogBox
        open={open}
        title={title}
        buttonName={buttonName}
        buttonClicked={() => {
          onSubmitData(data);
          setOpen(false);
          setData(null);
        }}
        isButtonDisabled={!data}
        cancelButtonClicked={() => {
          setOpen(false);
          setData(null);
        }}
      >
        {isDataLoading ? (
          <GordonLoader />
        ) : data ? (
          //<div style={{ maxHeight: 300, overflowY: 'auto', overflowX: 'visible' }}>
          data.map((row) => {
            const title = row['Title/Comment'] ? (
              <Typography variant="p">
                <b>Title:</b> {row['Title/Comment']}
                <br />
              </Typography>
            ) : null;
            const part = row.Participation ? (
              <Typography variant="p">
                <b>Participation:</b> {row.Participation}
              </Typography>
            ) : null;
            return (
              <Card style={{ padding: '5px', lineHeight: '1.6em' }}>
                <Typography color="primary" variant="h6">
                  {row.Username}
                </Typography>
                {title}
                {part}
              </Card>
            );
          })
        ) : (
          //</div>
          dropZone
        )}
        <GordonSnackbar
          open={error}
          text={error}
          severity={'error'}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={() => setError(null)}
        />
      </GordonDialogBox>
    </>
  );
};

export default SpreadsheetUploader;
