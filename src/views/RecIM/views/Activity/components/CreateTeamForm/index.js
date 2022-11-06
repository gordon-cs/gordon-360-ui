import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import styles from './CreateTeamForm.module.css';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { InformationField } from '../../../../components/CreateActivityForm/components/InformationField';

const CreateTeamForm = ({
  closeWithSnackbar,
  openCreateActivityForm,
  setOpenCreateActivityForm,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
  });

  const currentInfo = useMemo(() => {
    return {
      name: '',
      regStart: '',
      regEnd: '',
      type: '',
      sport: '',
      cap: '',
      individual: false,
    };
  }, []);
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: condition,
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== newInfo[field]) {
        hasChanges = true;
      }
      switch (field) {
        case 'name':
        case 'regStart':
        case 'regEnd':
        case 'type':
        case 'sport':
        case 'cap':
        case 'individual':
          handleSetError(field, newInfo[field] === '');
          hasError = newInfo[field] === '' || hasError;
          break;

        default:
          break;
      }
    }
    setDisableUpdateButton(hasError || !hasChanges);
  }, [newInfo, currentInfo]);

  const handleChange = (event, src) => {
    const getNewInfo = (currentValue) => {
      // datetime pickers return value rather than event,
      // so we can also manually specify target source and value
      if (src) {
        let newValue = event;
        return {
          ...currentValue,
          [src]: newValue,
        };
      }
      return {
        ...currentValue,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      };
    };
    setNewInfo(getNewInfo);
  };

  //   const getFieldLabel = (fieldName) => {
  //     const matchingField = allFields.find((field) => field.name === fieldName);
  //     return matchingField.label;
  //   };

  //   function getNewFields(newInfo, currentInfo) {
  //     const updatedFields = [];
  //     Object.entries(currentInfo).forEach(([field, value]) => {
  //       if (newInfo[field] !== value)
  //         updatedFields.push({
  //           Field: field,
  //           Value: value,
  //           Label: getFieldLabel(field),
  //         });
  //     });
  //     return updatedFields;
  //   }

  const handleConfirm = () => {
    setSaving(true);
    //hard coded for activity, sportId & typeID are hard coded to 0
    //until we pull API data

    // postSmashActivity().then(() => {
    //   setSaving(false);
    //   closeWithSnackbar({
    //     type: 'success',
    //     message: 'Your new activity has been created or whatever message you want here',
    //   });
    //   handleWindowClose();
    // });

    // createNewActivity(requestData).then(() => {
    //   setSaving(false);
    //   closeWithSnackbar({
    //     type: 'success',
    //     message: 'Your new activity has been created or whatever message you want here',
    //   });
    //   handleWindowClose();
    // });
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setNewInfo(currentInfo);
  };

  /**
   * @param {Array<{name: string, label: string, type: string, menuItems: string[]}>} fields array of objects defining the properties of the input field
   * @returns JSX correct input for each field based on type
   */
  const mapFieldsToInputs = (fields) => {
    return fields.map((field) => (
      <InformationField
        key={field.name}
        error={field.error}
        label={field.label}
        name={field.name}
        helperText={field.helperText}
        value={newInfo[field.name]}
        type={field.type}
        menuItems={field.menuItems}
        onChange={handleChange}
      />
    ));
  };

  return (
    <GordonDialogBox
      open={openCreateActivityForm}
      title="Create a Team"
      fullWidth
      maxWidth="lg"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenCreateActivityForm(false);
      }}
      cancelButtonName="cancel"
      titleClass={styles.formTitle}
    >
      <Grid container spacing={2}>
        <InformationField
          key={'name'}
          error={errorStatus.name}
          label={'Name'}
          name={'name'}
          helperText={'*required'}
          value={newInfo['name']}
          type={'text'}
          menuItems={null}
          onChange={handleChange}
        />
      </Grid>

      {/* <Card>
        <CardHeader className={styles.update_header} title={'Team Information'} />
        <CardContent>
          <Grid container spacing={2}>
            {mapFieldsToInputs(createActivityFields)}
          </Grid>
        </CardContent>
      </Card> */}

      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Activity"
        buttonClicked={!isSaving ? handleConfirm : null}
        buttonName="Confirm"
        // in case you want to authenticate something change isButtonDisabled
        isButtonDisabled={false}
        cancelButtonClicked={!isSaving ? handleWindowClose : null}
        cancelButtonName="Cancel"
      >
        {/* <ConfirmationWindowHeader /> */}
        <Grid container>
          {/* {getNewFields(currentInfo, newInfo).map((field) => (
            <ConfirmationRow key={field} field={field} prevValue={currentInfo[field.Field]} />
          ))} */}
        </Grid>
        {isSaving ? <GordonLoader size={32} /> : null}
      </GordonDialogBox>
    </GordonDialogBox>
  );
};

export default CreateTeamForm;
