import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { subYears } from 'date-fns';
import { useMemo, useState } from 'react';

interface Props {
  value: string | null;
  onChange: (
    value: string | null,
    context: PickerChangeHandlerContext<DateValidationError>,
  ) => void;
  onError: (error: DateValidationError | null) => void;
}

export const CustomDatePicker: React.FC<Props> = ({ value, onChange, onError }) => {
  const [dateError, setDateError] = useState<DateValidationError | null>(null);

  const minDate = subYears(new Date(), 1).toISOString();

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case 'invalidDate': {
        return 'Invalid Date';
      }
      case 'disableFuture': {
        return 'Cannot lose an item in the future';
      }
      case 'minDate': {
        return 'Date must be within the past year';
      }
      default: {
        return null;
      }
    }
  }, [dateError]);

  // Using DatePicker component from MUI/x, with custom styling to fix dark mode contrast issues
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Lost"
        value={value}
        onChange={onChange}
        onError={(newError) => {
          setDateError(newError);
          onError(newError);
        }}
        disableFuture
        minDate={minDate}
        orientation="portrait"
        name="Date Lost"
        // Custom styling, better dark mode contrast and conformity with filled style form fields
        // Thanks to help for understanding from
        // https://blog.openreplay.com/styling-and-customizing-material-ui-date-pickers/
        slotProps={{
          textField: {
            helperText: errorMessage ? errorMessage : 'Change if lost before today',
            // Custom styling for the input field, to make it look like filled variant
            sx: {
              backgroundColor: 'var(--mui-palette-FilledInput-bg);',
              paddingTop: '7px;',
              borderRadius: '5px;',
              width: '100%;',
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, 4px) scale(0.75);',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'var(--mui-palette-secondary-main);',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0;',
                borderBottom:
                  '1px solid rgba(var(--mui-palette-common-onBackgroundChannel) / var(--mui-opacity-inputUnderline));',
                borderRadius: '0;',
              },
            },
          },
          layout: {
            sx: {
              '& .MuiPickersLayout-contentWrapper .Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root:focus.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
            },
          },
          actionBar: {
            sx: {
              ...{
                '& .MuiButtonBase-root': {
                  color: 'var(--mui-palette-secondary-400);',
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
