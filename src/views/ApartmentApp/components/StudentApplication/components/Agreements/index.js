import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core/';

/**
 * Renders a card displaying the apartment application instructions
 * @param {Object} props The React component props
 * @param {*} props.onChange The user authentication
 * @returns {JSX.Element} JSX Element for the instructions card
 */
const Agreements = ({ onChange }) => {
  const [checkboxes, setCheckboxes] = React.useState([
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
      label:
        'Any individual on this application who has been on disciplinary probation at any point during the 2019-2020 academic year has been approved to apply by the Dean of Student Care or the Director of Residence Life',
    },
    {
      checked: false,
      label:
        'Each individual on this application intends to register as a full-time student by apartment selection night (Apr. 23)',
    },
    {
      checked: false,
      label:
        'We understand that if any member of our application fails to register as a full-time student by Apr. 23, our application could be disqualified',
    },
    {
      checked: false,
      label:
        'We have read and understand all of the information and guidelines listed in Section 4',
    },
    {
      checked: false,
      label:
        'We certify that all information provided on this application is accurate, to the best of our knowledge',
    },
  ]);

  const handleChange = (event, index) => {
    // I don't know why, but it only works correctly if you explictly assign the new custom object to a variable, rather than returning the custom object declaration inline within the checkboxes.map()
    let newCheckboxObj = { checked: event.target.checked, label: checkboxes[index].label };
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((prevCheckbox, j) => (j === index ? newCheckboxObj : prevCheckbox)),
    );
    onChange(checkboxes.every((checkbox) => checkbox.checked));
  };

  const AgreementChecklistItem = ({ checked, index, label, onChange }) => (
    <React.Fragment>
      <FormControlLabel
        className="apartment-agreements-form-control-option"
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
    </React.Fragment>
  );

  const error = checkboxes.some((checkbox) => !checkbox.checked);

  return (
    <Card>
      <CardHeader title="Agreements" className="apartment-card-header" />
      <CardContent>
        <FormControl component="fieldset" className="apartment-agreements-form-control">
          {error && (
            <FormLabel component="legend" className="apartment-agreements-form-control-label">
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
                onChange={handleChange}
              />
            ))}
          </FormGroup>
          {error && (
            <FormHelperText>
              You must read and complete this section before you will be allowed to submit this
              application
            </FormHelperText>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Agreements;
