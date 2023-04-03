import { useState, useMemo } from 'react';
import Form from '../Form';
import { createSurface, editSurface } from 'services/recim/match';

const SurfaceForm = ({ surface, closeWithSnackbar, openSurfaceForm, setOpenSurfaceForm }) => {
  const [errorStatus, setErrorStatus] = useState({
    Name: false,
    Description: false,
  });

  const [isSaving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const createSurfaceFields = [
    {
      label: 'Name',
      name: 'Name',
      type: 'text',
      error: errorStatus.Name,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Description',
      name: 'Description',
      type: 'text',
      error: errorStatus.Name,
      required: false,
    },
  ];

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

  const errorCases = (field, value) => {
    switch (field) {
      default:
        return false;
    }
  };

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
      createSurface(surfaceRequest).then((createdSurface) => {
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
      fields={createSurfaceFields}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSurfaceForm}
      openForm={openSurfaceForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SurfaceForm;
