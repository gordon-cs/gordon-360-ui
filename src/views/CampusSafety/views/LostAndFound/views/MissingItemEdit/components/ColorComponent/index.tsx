import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import styles from './Color.module.scss';

const colorOptions = [
  'Black',
  'Blue',
  'Brown',
  'Gold',
  'Gray',
  'Green',
  'Maroon',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'Silver',
  'Tan',
  'White',
  'Yellow',
];

type ColorProps = {
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
};

const Color: React.FC<ColorProps> = ({ selectedColors = [], onColorChange }) => {
  const handleColorToggle = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(updatedColors);
  };

  return (
    <div className={styles.color_group}>
      <FormLabel>
        Item Color: Choose <u>ALL</u> that apply:
      </FormLabel>
      <FormGroup className={styles.checkbox_group}>
        {colorOptions.map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={selectedColors.includes(color)}
                onChange={() => handleColorToggle(color)}
              />
            }
            label={color}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default Color;
