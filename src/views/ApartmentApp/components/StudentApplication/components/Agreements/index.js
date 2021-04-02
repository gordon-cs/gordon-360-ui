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
  const [checkboxState, setCheckboxState] = React.useState({
    temp1: false,
    temp2: false,
    temp3: false,
    temp4: false,
    temp5: false,
    temp6: false,
    temp7: false,
    temp8: false,
    temp9: false,
  });

  const handleChange = (event) => {
    setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
    onChange(
      [temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9].filter((v) => v).length !== 9,
    );
  };

  const { temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9 } = checkboxState;
  const error =
    [temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8, temp9].filter((v) => v).length !== 9;

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
            <FormControlLabel
              control={<Checkbox checked={temp1} onChange={handleChange} name="agreement1" />}
              label="Each individual on the application has agreed to be on the application"
            />
            <FormControlLabel
              control={<Checkbox checked={temp2} onChange={handleChange} name="agreement1" />}
              label="We understand that if someone on this application has not agreed to be on the application, our application will be
              disqualified"
            />
            <FormControlLabel
              control={<Checkbox checked={temp3} onChange={handleChange} name="agreement1" />}
              label="Each individual on this application appears ONLY on this application
              "
            />
            <FormControlLabel
              control={<Checkbox checked={temp4} onChange={handleChange} name="agreement1" />}
              label="We understand that if an individual on this application also appears on another group's application, our application
              could be disqualified"
            />
            <FormControlLabel
              control={<Checkbox checked={temp5} onChange={handleChange} name="agreement1" />}
              label="Any individual on this application who has been on disciplinary probation at any point during the 2019-2020 academic
              year has been approved to apply by the Dean of Student Care or the Director of Residence Life"
            />
            <FormControlLabel
              control={<Checkbox checked={temp6} onChange={handleChange} name="agreement1" />}
              label="Each individual on this application intends to register as a full-time student by apartment selection night (Apr. 23)"
            />
            <FormControlLabel
              control={<Checkbox checked={temp7} onChange={handleChange} name="agreement1" />}
              label="We understand that if any member of our application fails to register as a full-time student by Apr. 23, our application could be disqualified"
            />
            <FormControlLabel
              control={<Checkbox checked={temp8} onChange={handleChange} name="agreement1" />}
              label="We have read and understand all of the information and guidelines listed in Section 4"
            />
            <FormControlLabel
              control={<Checkbox checked={temp9} onChange={handleChange} name="agreement1" />}
              label="We certify that all information provided on this application is accurate, to the best of our knowledge"
            />
          </FormGroup>
          <FormHelperText>You must check all agreements before you can submit</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default Agreements;
