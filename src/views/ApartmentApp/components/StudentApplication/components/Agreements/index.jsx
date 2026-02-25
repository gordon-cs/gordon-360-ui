import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material/';
import { Fragment, useEffect, useState } from 'react';
import { ApplicationProcessDates } from 'services/housing';
import { format } from 'date-fns';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';

/**
 * Renders a card displaying the apartment application instructions
 *
 * @param {Object} props The React component props
 * @param {boolean | string} props.deleting Status of delete operation
 * @param {Function} props.onChange Callback for change of the checkbox state
 * @returns {JSX.Element} JSX Element for the instructions card
 */
const Agreements = ({ deleting, onChange }) => {
  const [checkboxes, setCheckboxes] = useState([]);

  const loadAgreements = async () => {
    const currentYear = new Date().getFullYear();

    const newCheckboxes = [
      {
        checked: false,
        label:
          'Each individual on the application has agreed to be on the application. We understand that if someone on this application has not agreed to be on the application, our application will be disqualified',
      },
      {
        checked: false,
        label:
          "Each individual on this application appears ONLY on this application and not on any other applications. We understand that if an individual on this application also appears on another group's application, our application could be disqualified",
      },
      {
        checked: false,
        label: `Each individual on this application who has been on disciplinary probation at any point during the ${
          currentYear - 1
        }-${currentYear} academic year has been approved by the Care and Conduct Coordinator to apply for an apartment`,
      },
      {
        checked: false,
        label: `Each individual on this application intends to register for classes by ${format(ApplicationProcessDates.registrationDeadline, 'MMMM do, y')}. We understand that if any member of our application fails to register for classes by ${format(ApplicationProcessDates.registrationDeadline, 'MMMM do, y')}, our application could be disqualified`,
      },
      {
        checked: false,
        label:
          "Each individual on this application has submitted or is working with Student Financial Services to submit their housing deposit. We understand that if any member of our application has not submitted their housing deposits by the date of this application's submission, our application could be disqualified",
      },
      {
        checked: false,
        label: (
          <>
            We have completed{' '}
            <a
              className="gc360_text_link"
              href="https://gordoncollegestudent-ma.safecolleges.com/login"
            >
              our awareness education modules in Vector Solutions
            </a>
            . We understand that we will not be eligible to apply for housing if our awareness
            education modules are incomplete
          </>
        ),
      },
      {
        checked: false,
        label:
          'We confirm that we will have a full apartment in both the fall and spring semesters. We understand that if this changes at any point, our apartment/roommate status may be changed at the discretion of the Housing Office.',
      },
      {
        checked: false,
        label:
          'We understand that if the number of residents in our apartment changes at any point, the Housing Office reserves the right to reassign our apartment to a different room prior to move-in (based on bed stock) and/or assign a new roommate as necessary throughout the year',
      },
      {
        checked: false,
        label:
          'We agree to host other students in our apartment during the winter break recess, in accordance with the policy outlined in the student handbook',
      },
      {
        checked: false,
        label:
          'We have read and understand all of the information and guidelines listed in the Instructions section',
      },
      {
        checked: false,
        label:
          'We certify that all information provided on this application is accurate, to the best of our knowledge',
      },
    ];

    setCheckboxes(newCheckboxes);
  };

  useEffect(() => loadAgreements(), []);

  useEffect(() => deleting === 'success' && loadAgreements(), [deleting]);

  const handleChange = (event, index) => {
    setCheckboxes((prevCheckboxes) => {
      let newCheckboxes = prevCheckboxes.map((prevCheckbox, j) =>
        j === index ? { ...prevCheckbox, checked: event.target.checked } : prevCheckbox,
      );
      onChange(newCheckboxes.every((checkbox) => checkbox.checked));
      return newCheckboxes;
    });
  };

  const AgreementChecklistItem = ({ checked, index, label, onChange }) => (
    <Fragment>
      <FormControlLabel
        className={styles.apartment_agreements_form_control_option}
        control={
          <Checkbox
            checked={checked}
            onChange={(event) => onChange(event, index)}
            name={'agreement-' + 1}
          />
        }
        label={label}
        key={index}
      />
      <Divider />
    </Fragment>
  );

  const error = checkboxes.some((checkbox) => !checkbox.checked);

  return (
    <Card>
      <CardHeader title="Agreements" className={styles.apartment_card_header} />
      <CardContent>
        <FormControl component="fieldset" className={styles.apartment_agreements_form_control}>
          {error && (
            <FormLabel
              component="legend"
              className={styles.apartment_agreements_form_control_label}
            >
              Use the checkboxes next to each statement to indicate your group's understanding
              and/or affirmative answer. Failure to complete this section will result in the
              disqualification of the application.
            </FormLabel>
          )}
          <FormGroup>
            <Divider />
            {checkboxes.map((checkbox, index) => (
              <AgreementChecklistItem
                checked={checkbox.checked}
                index={index}
                key={index}
                label={checkbox.label}
                onChange={(event, index) => handleChange(event, index)}
              />
            ))}
          </FormGroup>
          <FormHelperText>
            You must read and complete this section before you will be allowed to submit this
            application
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Agreements;
