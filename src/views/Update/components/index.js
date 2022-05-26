import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core/';
import styles from '../Update.module.css';


const NotAlumni = () => {
  <Grid container justifyContent="center" spacing="16">
    <Grid item xs={12} md={8}>
      <Card>
        <CardContent
          style={{
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <br />
          <h1>{'Update Information Unavailable'}</h1>
          <h4>{'Updating alumni info is currently available for alumni only'}</h4>
          <br />
          <br />
        </CardContent>
        <Button
          className={styles.update_info_button}
          justifyContent="center"
          onClick={() => {
            window.location.pathname = '';
          }}
        >
          Back To Home
        </Button>
      </Card>
    </Grid>
  </Grid>
}

const UpdateGrid = (props) => {
  return (
    <Grid item xs={9} md={3} lg={3}>
      <TextField
        className="disable_select"
        style={{ width: 252, }}
        label={props.label}
        name={props.name}
        value={props.value}
        onChange={props.change}
      />
    </Grid>
  )
}

const UpdateForm = (props) => {
  return(
    <Grid item xs={9} md={3} lg={3}>
      <FormControlLabel
        control={<Checkbox checked={props.checked}
        onChange={props.change} />}
        label={props.label}
        name={props.name}
      />
    </Grid>
  )
}


export { NotAlumni, UpdateGrid,  }
