import { Grid } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { InformationField } from './components/InformationField';

const validateFieldFromUpdatedInfo = (updatedInfo) => (field) => {
  const value = updatedInfo[field.name];

  if (field.required && !Boolean(value)) return true;
  if (field.minimum && value < field.minimum) return true;
  if (field.maximum && value > field.maximum) return true;

  return false;
};

const Form = ({
  formTitles,
  fields: fieldSets,
  currentInfo,
  loading,
  isSaving,
  setOpenForm,
  openForm,
  handleConfirm,
  additionalContent,
  additionCancelActions,
  showConfirmationWindow = true,
}) => {
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);

  const allFields = useMemo(() => fieldSets.flat(), [fieldSets]);

  const isFieldInvalid = validateFieldFromUpdatedInfo(newInfo);

  const errors = allFields.filter(isFieldInvalid).map((f) => f.name);

  const updatedFields = useMemo(
    () => Object.entries(newInfo).filter(([key, value]) => currentInfo[key] !== value),
    [currentInfo, newInfo],
  );

  useEffect(() => {
    setNewInfo(currentInfo);
  }, [currentInfo]);

  const handleChange = (event, src) => {
    setNewInfo((currentValue) => {
      // datetime pickers return value rather than event,
      // so we can also manually specify target source and value
      if (src) {
        const newValue = event;
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
    });
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
          handleConfirm(newInfo, handleWindowClose);
        }
      }}
      isButtonDisabled={errors?.length > 0}
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
        fieldSets.map((fieldSet, index) => (
          <ContentCard
            title={formTitles.contentCardTitles?.[index] ?? `${formTitles.name} Information`}
          >
            {additionalContent}
            {fieldSet.map((field) => (
              <InformationField
                {...field}
                error={errors.find((e) => e === field.name)}
                value={newInfo[field.name]}
                onChange={handleChange}
              />
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
                label={allFields.find((field) => field.name === key)?.label}
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
