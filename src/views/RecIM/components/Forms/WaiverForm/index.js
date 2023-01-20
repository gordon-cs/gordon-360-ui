import { Link, Typography } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createParticipant, logWaiverSigned } from 'services/recim/participant';
import { InformationField } from '../components/InformationField';

const WaiverForm = ({ username, closeWithSnackbar, openWaiverForm, setOpenWaiverForm }) => {
  const navigate = useHistory();
  const [errorStatus, setErrorStatus] = useState({
    readCheckbox: false,
    esignCheckbox: false,
    name: false,
    emailConfirmation: false,
  });

  const waiverFields = [
    {
      label: 'By checking this box, I agree to sign this waiver electronically.',
      name: 'esignCheckbox',
      type: 'checkbox',
      error: errorStatus.esignCheckbox,
      helperText: '*Required',
    },
    {
      label:
        'By checking this box, I have certified that I have read the Gordon Waiver. I also agree to sign this waiver electronically.',
      name: 'readCheckbox',
      type: 'checkbox',
      error: errorStatus.readCheckbox,
      helperText: '*Required',
    },
    {
      label: 'Electronic Signature',
      name: 'name',
      type: 'text',
      error: errorStatus.name,
      helperText: '*Required',
    },
    {
      label: 'Confirm Email Address',
      name: 'emailConfirmation',
      type: 'text',
      error: errorStatus.emailConfirmation,
      helperText: '*Required',
    },
  ];

  const currentInfo = useMemo(() => {
    return {
      esignCheckbox: false,
      readCheckbox: false,
      name: '',
      emailConfirmation: '',
    };
  }, []);

  const [newInfo, setNewInfo] = useState(currentInfo);
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

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== newInfo[field]) {
        hasChanges = true;
      }
      handleSetError(field, newInfo[field] === '');
      hasError = newInfo[field] === '' || hasError || !hasChanges;
    }
    setDisableUpdateButton(hasError);
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
    setNewInfo(getNewInfo);
  };

  const handleCancel = () => {
    setNewInfo(currentInfo);
    setOpenWaiverForm(false);
    navigate.push(''); //routes back to home if user refuses waiver
  };

  const handleConfirm = () => {
    if (!newInfo['readCheckbox'] || !newInfo['name']) {
      closeWithSnackbar({
        type: 'warning',
        message: 'The waiver must be signed before participating in RecIM',
      });
      return;
    }

    let signatureObject = {
      signedName: newInfo['name'],
      timestamp: new Date(),
      ipAddress: null,
    };

    logWaiverSigned(signatureObject)
      .then(() => {
        createParticipant(username).then(() => {
          closeWithSnackbar({
            type: 'success',
            message: 'Thank you for signing the waiver.',
          });

          handleWindowClose();
        });
      })
      .catch((e) => {
        closeWithSnackbar({
          type: 'error',
          message: 'Failed to sign waiver. Please try again.',
        });
      });
  };

  const handleWindowClose = () => {
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

  let content = (
    <>
      <Typography margin={4}>
        <Typography variant="h5">PHYSICAL ACTIVITY READINESS CONFIRMATION</Typography>

        <Typography variant="body1" paragraph>
          Are you ready for physical activity? Your willingness to use the Bennett Center indicates
          that you have received medical approval and you must provide a completed Physicians
          Clearance form to the Gordon College Bennett Center. (Our staff will provide the form), if
          you have had or are experiencing any of the following: Heart condition; chest pain; loss
          of balance; dizziness; loss of consciousness; joint or bone problems; pregnant; taking
          medication for blood pressure; insulin-dependent diabetes; over 68 years of age.
          Otherwise, I have decided to participate in the activity and/or use of equipment with or
          without the approval of my physician and do hereby assume all responsibility for my
          participation.
          {''}
        </Typography>
        <Typography variant="h5">RELEASE</Typography>
        <Typography variant="body1" paragraph>
          In consideration of the right to use the Bennett Center, I the undersigned, on behalf of
          myself, my spouse, heirs, representatives, executors, administrators and assigns, and to
          the fullest extent permitted by law, agree to and hereby do forever release Gordon College
          from any cause of action, claims, or demands of any nature whatsoever, including but not
          limited to a claim of negligence which I or my spouse, heirs, representatives, executors,
          administrators and assigns may now have, or have in the future against Gordon College on
          account of personal injury, bodily injury, property damage, death or accident of any kind,
          arising out of or in any way related to my use of the Bennett Center or other Gordon
          facilities, equipment, or services however the injury is caused, including whether by the
          ordinary negligence of Gordon College or otherwise; and I covenant not to sue and agree to
          indemnify and hold harmless Gordon College from any and all causes of action, claims,
          demands, losses or costs of any nature whatsoever arising out of or in any way relating to
          my use of the Bennett Center or other Gordon facilities and my use of facilities,
          equipment, or services in association with the Activity.
        </Typography>

        <Typography variant="h5">ASSUMPTION OF RISK. </Typography>
        <Typography variant="body1" paragraph>
          I VOLUNTARILY ASSUME ALL RISKS RELATED TO USING THE BENNETT CENTER (“Activity”) including
          injury or illness or death, and damage or loss of property, from accidents of any nature
          whatsoever, that may occur as a result of participating in an activity or contact with
          physical surroundings, environment, equipment or other persons acknowledging that I have
          full knowledge of the nature and extent of all the risks associated with using the Bennett
          Center including but not limited to injuries arising from: negligence of Gordon employees
          or others present, failures of any or all equipment or facilities, improper technique or
          incomplete or incorrect instruction, and of impacts with other persons or equipment. This
          agreement is made in sole consideration of Gordon College permitting my use of the Bennett
          Center or other Gordon facilities, equipment, or services. I agree to comply with any
          Gordon College and Bennett Center rules and regulations. Hours, services and policies are
          subject to change, without prior notice, in the sole discretion of Gordon College. I agree
          to accept such reasonable changes as a condition of membership. I certify that I have read
          this application in its entirety and that by signing below I agree to be bound by all of
          its terms and conditions. My signature below provides permission and waives/release claims
          for any minor participating because of my membership.
          {''}
        </Typography>
      </Typography>
      <>{mapFieldsToInputs(waiverFields)}</>

      <Typography variant="body1" paragraph>
        Prefer to sign a paper copy? Please contact{' '}
        <Link to="mailto:rec.im@gordon.edu">Rec.IM@gordon.edu</Link>
      </Typography>
    </>
  );

  return (
    <GordonDialogBox
      open={openWaiverForm}
      title="Gordon Recreation and Intramural Waiver"
      fullWidth
      maxWidth="lg"
      buttonClicked={() => handleConfirm()}
      isButtonDisabled={disableUpdateButton}
      buttonName="I Accept"
      cancelButtonClicked={() => handleCancel()}
      cancelButtonName="cancel"
    >
      {content}
    </GordonDialogBox>
  );
};

export default WaiverForm;
