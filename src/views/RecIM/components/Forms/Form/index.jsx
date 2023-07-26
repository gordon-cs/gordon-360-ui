import { useState, useEffect, useMemo } from 'react';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ContentCard } from './components/ContentCard';
import { InformationField } from './components/InformationField';

export const validateFieldFromUpdatedInfo = (updatedInfo) => (field) => {
  const value = updatedInfo[field.name];

  if (field.required && !Boolean(value)) return true;
  if (value < field?.min) return true;
  if (value > field?.max) return true;

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
  headerNotes,
  additionalContent,
  additionCancelActions,
  newInfoCallback,
}) => {
  const [newInfo, setNewInfo] = useState(currentInfo);

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
    const updateField = (prevFields) => {
      // datetime pickers return value rather than event,
      // so we can also manually specify target source and value
      if (src) {
        const newValue = event;
        return {
          ...prevFields,
          [src]: newValue,
        };
      }
      return {
        ...prevFields,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      };
    };
    setNewInfo(updateField);
    newInfoCallback?.(updateField);
  };

  const handleWindowClose = () => {
    setOpenForm(false);
    setNewInfo(currentInfo);
  };

  const handleCancelClick = () => {
    setNewInfo(currentInfo);
    setOpenForm(false);
    if (additionCancelActions) {
      additionCancelActions();
    }
  };

  return (
    <GordonDialogBox
      open={openForm}
      title={`${formTitles.formType} ${formTitles.name}`}
      fullWidth
      maxWidth="lg"
      buttonClicked={() => handleConfirm(newInfo, handleWindowClose)}
      isButtonDisabled={errors?.length > 0}
      buttonName="Submit"
      cancelButtonClicked={handleCancelClick}
      cancelButtonName="cancel"
      onClose={handleCancelClick}
    >
      {headerNotes}
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
    </GordonDialogBox>
  );
};

export default Form;
