import { CheckBox } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Radio,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import Header from '../../components/Header';
import styles from './MissingItemForm.module.scss';

const MissingItemForm = () => {
  return (
    <Card className={styles.form_card}>
      <CardHeader
        title="Missing Item Report"
        titleTypographyProps={{ align: 'center' }}
        className="gc360_header"
      />

      <Grid container justifyContent={'center'}>
        <Grid sm={5}>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="First Name"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Last Name"></TextField>
          </Grid>
          <Grid item margin={3} className={styles.description_radio_group}>
            <Grid container>
              <FormControl>
                <FormLabel>Item Description</FormLabel>
                <RadioGroup>
                  <Grid item>
                    <FormControlLabel
                      value="clothing/shoes"
                      control={<Radio />}
                      label="Clothing/Shoes"
                    />
                    <FormControlLabel value="electronics" control={<Radio />} label="Electronics" />
                    <FormControlLabel
                      value="jewelry/watches"
                      control={<Radio />}
                      label="Jewelry/Watches"
                    />
                    <FormControlLabel
                      value="keys/keychains"
                      control={<Radio />}
                      label="Keys/Keychains"
                    />
                    <FormControlLabel
                      value="glasses/sunglass"
                      control={<Radio />}
                      label="Glasses/Sunglasses"
                    />
                    <FormControlLabel
                      value="bottles/mugs"
                      control={<Radio />}
                      label="Bottles/Mugs"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel value="books" control={<Radio />} label="Books" />
                    <FormControlLabel
                      value="bags/purses/knapsacks"
                      control={<Radio />}
                      label="Bags/Purses/Knapsacks"
                    />
                    <FormControlLabel
                      value="office/schoolsupplies"
                      control={<Radio />}
                      label="Office/School Supplies"
                    />
                    <FormControlLabel value="ids/wallets" control={<Radio />} label="IDs/Wallets" />
                    <FormControlLabel
                      value="currency/creditcards"
                      control={<Radio />}
                      label="Currency/Credit Cards"
                    />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Item Brand or Make"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField
              fullWidth
              multiline
              minRows={8}
              variant="filled"
              placeholder="Item Description: Be as detailed as possible"
            ></TextField>
          </Grid>
        </Grid>
        <Grid sm={5}>
          <Grid item margin={3} className={styles.description_select_group}>
            <Grid container>
              <FormGroup>
                <FormLabel>Item Color: Choose ALL that apply</FormLabel>
                <Grid item>
                  <FormControlLabel control={<Checkbox />} label="Black" />
                  <FormControlLabel control={<Checkbox />} label="Blue" />
                  <FormControlLabel control={<Checkbox />} label="Brown" />
                  <FormControlLabel control={<Checkbox />} label="Gold" />
                  <FormControlLabel control={<Checkbox />} label="Gray" />
                  <FormControlLabel control={<Checkbox />} label="Green" />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Checkbox />} label="Maroon" />
                  <FormControlLabel control={<Checkbox />} label="Orange" />
                  <FormControlLabel control={<Checkbox />} label="Pink" />
                  <FormControlLabel control={<Checkbox />} label="Purple" />
                  <FormControlLabel control={<Checkbox />} label="Red" />
                  <FormControlLabel control={<Checkbox />} label="Silver" />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Checkbox />} label="Tan" />
                  <FormControlLabel control={<Checkbox />} label="White" />
                  <FormControlLabel control={<Checkbox />} label="Yellow" />
                </Grid>
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item margin={3}>
            <TextField
              fullWidth
              multiline
              minRows={8}
              variant="filled"
              placeholder="Location Lost: Be as detailed as possible"
            ></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Date Lost"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Phone Number"></TextField>
          </Grid>
          <Grid item margin={3}>
            <TextField fullWidth variant="filled" placeholder="Alternate Phone Number"></TextField>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MissingItemForm;
