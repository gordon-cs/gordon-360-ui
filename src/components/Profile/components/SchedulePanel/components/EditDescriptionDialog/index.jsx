import { Component } from 'react';
import { gordonColors } from 'theme';
import styles from './EditDescriptionDialog.module.css';

import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

export default class EditDescriptionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descInput: '',
      formErrors: {
        descInput: '',
      },
      editDescriptionOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.descInput !== nextProps.descriptiontext) {
      this.setState({ descInput: nextProps.descriptiontext });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var desc = this.state.descInput;
    this.props.onDialogSubmit(desc);
    this.handleClose();
  };

  handleChange = (name) => (e) => {
    this.setState({ [name]: e.target.value }, () => {});
  };

  handleClose = () => {
    this.props.handleEditDescriptionClose();

    this.setState({ formValid: true });
  };

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <Dialog open={this.props.editDescriptionOpen} keepMounted fullWidth="true" maxWidth="xs">
        <div className={styles.desc_tile}>
          <DialogTitle className={styles.desc_title}>Edit Public Note</DialogTitle>

          <TextField
            id="outlined-multiline-static"
            label="DESCRIPTION"
            multiline
            rows={3}
            defaultValue={this.state.descInput}
            value={this.state.descInput}
            onChange={this.handleChange('descInput')}
            className={styles.desc_description}
          />

          <DialogActions className={styles.desc_buttons}>
            <Button
              onClick={this.props.handleEditDescriptionClose}
              variant="contained"
              style={button}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={this.handleSubmit} style={button}>
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}
