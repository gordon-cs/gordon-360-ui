import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
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
  errorCases,
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
  const allFields = fields.flat();

  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
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
        errorCases(field, newInfo[field])
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

  const getFieldLabel = (fieldName) => {
    const matchingField = allFields.find((field) => field.name === fieldName);
    return matchingField.label;
  };

  function getNewFields(currentInfo, newInfo) {
    const updatedFields = [];
    Object.entries(newInfo).forEach(([key, value]) => {
      if (currentInfo[key] !== value)
        updatedFields.push({
          Field: key,
          Value: value,
          Label: getFieldLabel(key),
        });
    });
    return updatedFields;
  }

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setOpenForm(false);
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
        xs={12}
        sm={6}
        md={4}
        lg={3}
      />
    ));
  };

  const DialogContent = () => {
    let index = 0;
    return fields.map((set) => (
      <ContentCard
        title={
          formTitles.contentCardTitles
            ? formTitles.contentCardTitles[index++]
            : `${formTitles.name} Information`
        }
      >
        {additionalContent}
        {loading ? <GordonLoader /> : mapFieldsToInputs(set)}
      </ContentCard>
    ));
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
      buttonName={'Submit'}
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenForm(false);
        if (additionCancelActions) {
          additionCancelActions();
        }
      }}
      cancelButtonName={'cancel'}
    >
      {DialogContent()}

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
            {getNewFields(currentInfo, newInfo).map((field) => (
              <ConfirmationRow key={field} field={field} />
            ))}
          </Grid>
          {isSaving && <GordonLoader size={32} />}
        </GordonDialogBox>
      )}
    </GordonDialogBox>
  );
};

export default Form;
