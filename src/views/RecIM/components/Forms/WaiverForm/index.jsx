import { Typography } from '@mui/material';
import Form, { requiredFieldValidation } from '../Form';
import { useState, useMemo } from 'react';
import { createParticipant } from 'services/recim/participant';
import { useNavigate } from 'react-router-dom';

const waiverFields = [
  {
    label: 'By Clicking this, I have certified that I have read the Gordon Waiver',
    name: 'readCheckbox',
    type: 'checkbox',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Electronic Signature',
    name: 'name',
    type: 'text',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
];

const WaiverForm = ({ username, closeWithSnackbar, openWaiverForm, setOpenWaiverForm }) => {
  const navigate = useNavigate();
  const [isSaving, setSaving] = useState(false);

  const currentInfo = useMemo(() => {
    return {
      readCheckbox: false,
      name: '',
    };
  }, []);

  const handleCancel = () => {
    navigate('/'); //routes back to home if user refuses waiver
  };

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);
    createParticipant(username).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Your new activity has been created or whatever message you want here',
      });
      handleWindowClose();
    });
  };

  let waiverContent = (
    <Typography margin={4}>
      <Typography variant="h5">PHYSICAL ACTIVITY READINESS CONFIRMATION</Typography>

      <Typography variant="body1" paragraph>
        Are you ready for physical activity? Your willingness to use the Bennett Center indicates
        that you have received medical approval and you must provide a completed Physicians
        Clearance form to the Gordon College Bennett Center. (Our staff will provide the form), if
        you have had or are experiencing any of the following: Heart condition; chest pain; loss of
        balance; dizziness; loss of consciousness; joint or bone problems; pregnant; taking
        medication for blood pressure; insulin-dependent diabetes; over 68 years of age. Otherwise,
        I have decided to participate in the activity and/or use of equipment with or without the
        approval of my physician and do hereby assume all responsibility for my participation.
        {''}
      </Typography>
      <Typography variant="h5">RELEASE</Typography>
      <Typography variant="body1" paragraph>
        In consideration of the right to use the Bennett Center, I the undersigned, on behalf of
        myself, my spouse, heirs, representatives, executors, administrators and assigns, and to the
        fullest extent permitted by law, agree to and hereby do forever release Gordon College from
        any cause of action, claims, or demands of any nature whatsoever, including but not limited
        to a claim of negligence which I or my spouse, heirs, representatives, executors,
        administrators and assigns may now have, or have in the future against Gordon College on
        account of personal injury, bodily injury, property damage, death or accident of any kind,
        arising out of or in any way related to my use of the Bennett Center or other Gordon
        facilities, equipment, or services however the injury is caused, including whether by the
        ordinary negligence of Gordon College or otherwise; and I covenant not to sue and agree to
        indemnify and hold harmless Gordon College from any and all causes of action, claims,
        demands, losses or costs of any nature whatsoever arising out of or in any way relating to
        my use of the Bennett Center or other Gordon facilities and my use of facilities, equipment,
        or services in association with the Activity.
      </Typography>

      <Typography variant="h5">ASSUMPTION OF RISK. </Typography>
      <Typography variant="body1" paragraph>
        I VOLUNTARILY ASSUME ALL RISKS RELATED TO USING THE BENNETT CENTER (“Activity”) including
        injury or illness or death, and damage or loss of property, from accidents of any nature
        whatsoever, that may occur as a result of participating in an activity or contact with
        physical surroundings, environment, equipment or other persons acknowledging that I have
        full knowledge of the nature and extent of all the risks associated with using the Bennett
        Center including but not limited to injuries arising from: negligence of Gordon employees or
        others present, failures of any or all equipment or facilities, improper technique or
        incomplete or incorrect instruction, and of impacts with other persons or equipment. This
        agreement is made in sole consideration of Gordon College permitting my use of the Bennett
        Center or other Gordon facilities, equipment, or services. I agree to comply with any Gordon
        College and Bennett Center rules and regulations. Hours, services and policies are subject
        to change, without prior notice, in the sole discretion of Gordon College. I agree to accept
        such reasonable changes as a condition of membership. I certify that I have read this
        application in its entirety and that by signing below I agree to be bound by all of its
        terms and conditions. My signature below provides permission and waives/release claims for
        any minor participating because of my membership.
        {''}
      </Typography>
    </Typography>
  );

  return (
    <Form
      formTitles={{ name: 'Activity', formType: 'Form' }}
      fields={[waiverFields]}
      currentInfo={currentInfo}
      loading={false}
      isSaving={isSaving}
      setOpenForm={setOpenWaiverForm}
      openForm={openWaiverForm}
      handleConfirm={handleConfirm}
      additionalContent={waiverContent}
      additionCancelActions={handleCancel}
    />
  );
};

export default WaiverForm;
