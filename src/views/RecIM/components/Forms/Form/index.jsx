import { Grid } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { InformationField } from './components/InformationField';

const Form = ({
  formTitles,
  fields,
  currentInfo,
  isFieldInvalid,
  setErrorStatus,
  loading,
  isSaving,
  setOpenForm,
  openForm,
  handleConfirm,
  additionalContent,
  additionCancelActions,
  newInfoCallback,
  showConfirmationWindow = true,
}) => {
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const updatedFields = useMemo(
    () => Object.entries(newInfo).filter(([key, value]) => currentInfo[key] !== value),
    [currentInfo, newInfo],
  );

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: condition,
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  useEffect(() => {
    setNewInfo(currentInfo);
  }, [currentInfo]);

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== newInfo[field]) {
        hasChanges = true;
      }
      if (
        (fields.find((n) => n.name === field)?.required && !newInfo[field]) ||
        isFieldInvalid(field, newInfo[field])
      ) {
        handleSetError(field, true);
        if (!hasError) {
          hasError = true;
        }
      } else {
        handleSetError(field, false);
      }
    }
    setDisableUpdateButton(hasError || !hasChanges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    let tempNewInfo = getNewInfo(newInfo);
    if (newInfoCallback) {
      newInfoCallback(tempNewInfo);
    }
    setNewInfo(tempNewInfo);
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setOpenForm(false);
    setNewInfo(currentInfo);
  };

  return (
    <GordonDialogBox
      open={openForm}
      title={`${formTitles.formType} ${formTitles.name}`}
      fullWidth
      maxWidth="lg"
      buttonClicked={() => {
        // This will submit the data and close the window if we do not allow open confirm
        if (showConfirmationWindow) {
          setOpenConfirmWindow(true);
        } else {
          handleConfirm(handleWindowClose);
        }
      }}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenForm(false);
        if (additionCancelActions) {
          additionCancelActions();
        }
      }}
      cancelButtonName="cancel"
    >
      {loading ? (
        <GordonLoader />
      ) : (
        fields.map((fieldSet, index) => (
          <ContentCard
            title={formTitles.contentCardTitles?.[index] ?? `${formTitles.name} Information`}
          >
            {additionalContent}
            {fieldSet.map((field) => (
              <InformationField {...field} value={newInfo[field.name]} onChange={handleChange} />
            ))}
          </ContentCard>
        ))
      )}

      {!loading && (
        <GordonDialogBox
          open={openConfirmWindow}
          title={`Confirm Your ${formTitles.name}`}
          buttonClicked={() => {
            !isSaving && handleConfirm(newInfo, handleWindowClose);
          }}
          buttonName="Confirm"
          // in case you want to authenticate something change isButtonDisabled
          isButtonDisabled={false}
          cancelButtonClicked={() => {
            if (!isSaving) setOpenConfirmWindow(false);
          }}
          cancelButtonName="Cancel"
        >
          <ConfirmationWindowHeader />
          <Grid container>
            {updatedFields.map(([key, value]) => (
              <ConfirmationRow
                key={key}
                value={value}
                label={fields.flat().find((field) => field.name === key)?.label}
              />
            ))}
          </Grid>
          {isSaving && <GordonLoader size={32} />}
        </GordonDialogBox>
      )}
    </GordonDialogBox>
  );
};

export default Form;
