import { useState, useMemo } from 'react';
import Form from '../Form';
import { createCustomParticipant, editCustomParticipant } from 'services/recim/participant';

const genderTypes = ['U', 'M', 'F'];

const createParticipantFields = [
  {
    label: 'First Name',
    name: 'FirstName',
    type: 'text',
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Last Name',
    name: 'LastName',
    type: 'text',
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Specified Gender',
    name: 'SpecifiedGender',
    type: 'select',
    menuItems: genderTypes.map((type) => type),
  },
  {
    label: 'Turn On Email Notifications',
    name: 'AllowEmails',
    type: 'checkbox',
    helperText: '*Required', // checkbox: either 0 or 1 => default 1
    required: false,
  },
];

const ParticipantForm = ({
  participant,
  createSnackbar,
  onClose,
  openParticipantForm,
  setOpenParticipantForm,
}) => {
  const [isSaving, setSaving] = useState(false);

  const currentInfo = useMemo(() => {
    if (participant) {
      return {
        FirstName: participant.FirstName,
        LastName: participant.LastName,
        SpecifiedGender: participant.SpecifiedGender,
        AllowEmails: participant.AllowEmails,
      };
    }
    return {
      FirstName: '',
      LastName: '',
      SpecifiedGender: 'U',
      AllowEmails: true,
    };
  }, [participant]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let participantUsername =
      participant?.Username ?? (newInfo.FirstName + '.' + newInfo.LastName).replaceAll(' ', '');
    let participantRequest = { ...currentInfo, ...newInfo };

    if (participant) {
      editCustomParticipant(participantUsername, participantRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(
            `Participant ${participantRequest.FullName} has been edited successfully`,
            'success',
          );
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem editing custom participant: ${reason.title}`,
            'error',
          );
        });
    } else {
      createCustomParticipant(participantUsername, participantRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(
            `Participant ${participantRequest.FullName} has been created successfully`,
            'success',
          );
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem creating custom participant: ${reason.title}`,
            'error',
          );
        });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Participant', formType: participant ? 'Edit' : 'Create' }}
      fields={[createParticipantFields]}
      currentInfo={currentInfo}
      isSaving={isSaving}
      setOpenForm={setOpenParticipantForm}
      openForm={openParticipantForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default ParticipantForm;
