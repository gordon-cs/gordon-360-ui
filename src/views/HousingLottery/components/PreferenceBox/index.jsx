import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableContainer,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import housing from 'services/housing';
import styles from '../../../../HousingLottery.module.css';

function SurveyQuestionBox() {
    const [selectedOption, setSelectedOption] = useState(''); // Store the selected option
  
    // Handle the change of the selected option
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    // Your survey question text can go here
    const questionText = 'Are you a night owl or a morning bird?';
  
    return (
      <Card>
        <CardHeader title={questionText} />
        <CardContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="morning-or-night"
              name="morning-or-night"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="night-owl"
                control={<Radio />}
                label="Night Owl"
              />
              <FormControlLabel
                value="morning-bird"
                control={<Radio />}
                label="Morning Bird"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    );
  }
  