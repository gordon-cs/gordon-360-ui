import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import styles from './CreateTeamForm.module.css';
// import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { InformationField } from '../../../../components/CreateActivityForm/components/InformationField';
import { createNewTeam } from 'services/recim';

const CreateTeamForm = ({ closeWithSnackbar, openCreateTeamForm, setOpenCreateTeamForm }) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
  });

  const currentInfo = useMemo(() => {
    return {
      name: '',
    };
  }, []);
  const [newInfo, setNewInfo] = useState(currentInfo);
  // const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
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

  const handleConfirm = () => {
    let requestData = {
      Name: 'test',
      Logo: 'string',
    };
    createNewTeam(requestData).then(() => {
      closeWithSnackbar({
        type: 'success',
        message: 'Team created successfully',
      });

      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenCreateTeamForm(false);
    // setOpenConfirmWindow(false);
    setNewInfo(currentInfo);
  };

  return (
    <GordonDialogBox
      open={openCreateTeamForm}
      title="Create a Team"
      fullWidth
      maxWidth="sm"
      buttonClicked={handleConfirm}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenCreateTeamForm(false);
      }}
      cancelButtonName="cancel"
      titleClass={styles.formTitle}
    >
      <Grid container spacing={2} justifyContent="center">
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
          xs={12}
          md={6}
        />
      </Grid>

      {/* Confirmation Dialog */}
      {/* <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Team"
        buttonClicked={!isSaving ? handleConfirm : null}
        buttonName="Confirm"
        // in case you want to authenticate something change isButtonDisabled
        isButtonDisabled={false}
        cancelButtonClicked={!isSaving ? handleWindowClose : null}
        cancelButtonName="Cancel"
      >
        <ConfirmationWindowHeader />
        <Grid container>
          {/* {getNewFields(currentInfo, newInfo).map((field) => (
            <ConfirmationRow key={field} field={field} prevValue={currentInfo[field.Field]} />
          ))}
        </Grid>
        {isSaving ? <GordonLoader size={32} /> : null}
      </GordonDialogBox> */}
    </GordonDialogBox>
  );
};

export default CreateTeamForm;
