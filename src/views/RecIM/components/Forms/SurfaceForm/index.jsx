import { useState, useMemo } from 'react';
import Form from '../Form';
import { createSurface, editSurface } from 'services/recim/match';

const createSurfaceFields = [
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
];

const SurfaceForm = ({ surface, createSnackbar, onClose, openSurfaceForm, setOpenSurfaceForm }) => {
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
      editSurface(surface.ID, surfaceRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Surface ${surfaceRequest.Name} has been edited successfully`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(`There was a problem editing your surface: ${reason.title}`, 'error');
        });
    } else {
      createSurface(surfaceRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Surface ${surfaceRequest.Name} has been created successfully`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(`There was a problem creating your surface: ${reason.title}`, 'error');
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
