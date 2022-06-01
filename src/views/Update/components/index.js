import {
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
  return(
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
  )
}

const UpdateGrid = (props) => {
  return (
    <Grid item xs={9} md={3} lg={3}>
      <TextField
        className="disable_select"
        style={{ width: 252, }}
        label={props.info.label}
        name={props.info.name}
        value={props.info.value}
        onChange={props.onChange}
      />
    </Grid>
  )
}

const UpdateForm = (props) => {
  return(
    <Grid item xs={9} md={3} lg={3}>
      <FormControlLabel
        control={<Checkbox checked={props.info.checked}
        onChange={props.onChange} />}
        label={props.info.label}
        name={props.info.name}
      />
    </Grid>
  )
}

const UpdateSelect = (props) => {
  return(
    <Grid item xs={9} md={3} lg={3}>
      <FormControl style={{ width: 252 }}>
        <InputLabel>{props.info.label}</InputLabel>
        <Select
          label={props.info.label}
          name={props.info.name}
          value={props.info.value}
          onChange={props.onChange}
        >
          {props.info.menuItem.map((info) => (
            <MenuItem value={info.value}>{info.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

const contentCard = (props) => {
  return(
    <Card>
      <CardHeader
        className={styles.update_header}
        title={props.title}
      />
      <CardContent>
        <Grid container>
          {props.info}
        </Grid>
      </CardContent>
    </Card>
  )
}

export { NotAlumni, UpdateGrid, UpdateForm, UpdateSelect, contentCard };
