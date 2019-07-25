import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { gordonColors } from '../../../../theme';
import './editdescriptiondialog.css';

export default class EditDescriptionDialog extends React.Component {
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

  handleSubmit = e => {
    e.preventDefault();
    var desc = this.state.descInput;
    this.props.onDialogSubmit(desc);
    this.handleClose();
  };

  handleChange = name => e => {
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
        <div className="desc-tile">
          <DialogTitle className="desc-title">Edit schedule description</DialogTitle>

          <TextField
            id="descInput"
            label="Description"
            defaultValue={this.state.descInput}
            value={this.state.descInput}
            onChange={this.handleChange('descInput')}
            className="desc-description"
          />

          <DialogActions className="desc-buttons">
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
