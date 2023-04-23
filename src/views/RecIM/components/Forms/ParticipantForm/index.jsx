import { useState, useMemo } from 'react';
import Form from '../Form';
import { createCustomParticipant, editCustomParticipant } from 'services/recim/participant';

const genderTypes = ['Undefined', 'Male', 'Female'];

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
  {
    label: 'Email Address',
    name: 'Email',
    type: 'text',
    helperText: '*Required',
    required: true,
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

  const getGenderChar = (gender) => {
    switch (gender) {
      case 'Male':
        return 'M';
      case 'Female':
        return 'F';
      default:
        return 'U';
    }
  };

  const getGender = (genderChar) => {
    switch (genderChar) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      default:
        return 'Undefined';
    }
  };

  const currentInfo = useMemo(() => {
    if (participant) {
      return {
        FirstName: participant.FirstName,
        LastName: participant.LastName,
        SpecifiedGender: getGender(participant.SpecifiedGender),
        AllowEmails: participant.AllowEmails,
        Email: participant.Email,
      };
    }
    return {
      FirstName: '',
      LastName: '',
      SpecifiedGender: 'Undefined',
      AllowEmails: true,
      Email: '',
    };
  }, [participant]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let participantUsername =
      participant?.Username ?? (newInfo.FirstName + '.' + newInfo.LastName).replaceAll(' ', '');
    let participantRequest = { ...currentInfo, ...newInfo };
    participantRequest.SpecifiedGender = getGenderChar(participantRequest.SpecifiedGender);

    if (participant) {
      editCustomParticipant(participantUsername, participantRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(
            `Participant ${participantRequest.FirstName} ${participantRequest.LastName} has been updated successfully`,
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
            `Participant ${participantRequest.FirstName} ${participantRequest.LastName} has been created successfully`,
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
      formTitles={{ name: 'Non-Gordon Participant', formType: participant ? 'Edit' : 'Create' }}
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
