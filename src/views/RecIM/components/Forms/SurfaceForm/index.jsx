import { useState, useMemo } from 'react';
import Form, { requiredFieldValidation } from '../Form';
import { createSurface, editSurface } from 'services/recim/match';

const createSurfaceFields = [
  {
    label: 'Name',
    name: 'Name',
    type: 'text',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Description',
    name: 'Description',
    type: 'text',
    required: false,
  },
];

const SurfaceForm = ({ surface, closeWithSnackbar, openSurfaceForm, setOpenSurfaceForm }) => {
  const [isSaving, setSaving] = useState(false);

  const currentInfo = useMemo(() => {
    if (surface) {
      return {
        Name: surface.Name,
        Description: surface.Description,
      };
    }
    return {
      Name: '',
      Description: '',
    };
  }, [surface]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let surfaceRequest = { ...currentInfo, ...newInfo };

    if (surface) {
      editSurface(surface.ID, surfaceRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Surface edited successfully',
        });

        handleWindowClose();
      });
    } else {
      createSurface(surfaceRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Surface created successfully',
        });
        handleWindowClose();
      });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Surface', formType: surface ? 'Edit' : 'Create' }}
      fields={[createSurfaceFields]}
      currentInfo={currentInfo}
      isSaving={isSaving}
      setOpenForm={setOpenSurfaceForm}
      openForm={openSurfaceForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SurfaceForm;
