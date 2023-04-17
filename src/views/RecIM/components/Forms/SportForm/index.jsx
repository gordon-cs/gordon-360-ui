import { useState, useMemo } from 'react';
import Form from '../Form';
import { createSport, editSport } from 'services/recim/sport';

const createSportFields = [
  {
    label: 'Name',
    name: 'Name',
    type: 'text',
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Description',
    name: 'Description',
    type: 'text',
    required: false,
  },
  {
    label: 'Rules',
    name: 'Rules',
    type: 'multiline',
    required: false,
  },
];

const SportForm = ({ sport, createSnackbar, onClose, openSportForm, setOpenSportForm }) => {
  const [isSaving, setSaving] = useState(false);

  const currentInfo = useMemo(() => {
    if (sport) {
      return {
        Name: sport.Name,
        Description: sport.Description,
        Rules: sport.Rules,
        isLogoUpdate: false,
      };
    }
    return {
      Name: '',
      Description: '',
      Rules: '',
      isLogoUpdate: false,
    };
  }, [sport]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let sportRequest = { ...currentInfo, ...newInfo };

    if (sport) {
      editSport(sport.ID, sportRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Sport ${sportRequest.Name} has been edited successfully`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(`There was a problem editing your sport: ${reason.title}`, 'error');
        });
    } else {
      createSport(sportRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Sport ${sportRequest.Name} has been created successfully`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(`There was a problem creating your sport: ${reason.title}`, 'error');
        });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Sport', formType: sport ? 'Edit' : 'Create' }}
      fields={[createSportFields]}
      currentInfo={currentInfo}
      isSaving={isSaving}
      setOpenForm={setOpenSportForm}
      openForm={openSportForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SportForm;
