import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core/';

/**
 * Renders a card displaying the apartment application instructions
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

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
    onChange(checkboxes.filter((checkbox) => checkbox.checked).length === checkboxes.length);
  };

  const error = checkboxes.filter((checkbox) => checkbox.checked).length !== checkboxes.length;

  return (
    <Card>
      <CardHeader title="Agreements" className="apartment-card-header" />
      <CardContent>
        <FormControl
          required
          error={error}
          component="fieldset"
          className="apartment-agreements-form-control"
        >
          <FormLabel component="legend">
            Please read the following agreements before submitting the application
          </FormLabel>
          <FormGroup>
            {checkboxes.map((checkbox, index) => (
              <FormControlLabel
                className="apartment-agreements-form-control-option"
                control={
                  <Checkbox
                    checked={checkbox.checked}
                    onChange={handleChange}
                    name={'agreement' + index}
                  />
                }
                label={checkbox.label}
              />
            ))}
          </FormGroup>
          {error && (
            <FormHelperText>You must check all agreements before you can submit</FormHelperText>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Agreements;
