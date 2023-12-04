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
import housing from 'services/housing';
// @TODO CSSMODULES - outside directory
import styles from '../../HousingLottery.module.css';

/**
 * Renders a card displaying the housing application instructions
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
    const selectionDate = await housing.getApartmentSelectionDate();

    const newCheckboxes = [
      {
        checked: false,
        label: 'Each individual on the application has agreed to be on the application',
      },
      {
        checked: false,
        label:
          'We understand that if someone on this application has not agreed to be on the application, our application will be disqualified',
      },
      {
        checked: false,
        label: 'Each individual on this application appears ONLY on this application',
      },
      {
        checked: false,
        label:
          "We understand that if an individual on this application also appears on another group's application, our application could be disqualified",
      },
      {
        checked: false,
        label: `Any individual on this application who has been on disciplinary probation at any point during the ${
          currentYear - 1
        }-${currentYear} academic year has been approved to apply by the Dean of Student Life or Assistant Dean of Student Life`,
      },
      {
        checked: false,
        label: `Each individual on this application intends to register as a full-time student by ${selectionDate}`,
      },
      {
        checked: false,
        label: `We understand that if any member of our application fails to register as a full-time student by ${selectionDate}, our application could be disqualified`,
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
      {
        checked: false,
        label:
          'We agree to host other students in our apartment during the winter break recess, in accordance with the policy outlined in the student handbook',
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
        className={styles.housing_agreements_form_control_option}
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
      <CardHeader title="Agreements" className={styles.housing_card_header} />
      <CardContent>
        <FormControl component="fieldset" className={styles.housing_agreements_form_control}>
          {error && (
            <FormLabel component="legend" className={styles.housing_agreements_form_control_label}>
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
