import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import React, { Component } from 'react';
import 'date-fns';
import '../apartmentAppComponents.css';

export default class ApplicantListField extends Component {
  renderApplicant(fullName) {
    return (
      <TextField
        key={fullName + '-textfield'}
        value={fullName}
        label="Applicant"
        variant="outlined"
        className={'text-field'}
        InputProps={{
          classes: { root: 'applicant-list-root' },
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }

  render() {
    const applicantList = this.props.applicantList;
    const fullNameList = applicantList.map((profile) => String(profile.fullName));
    const content = fullNameList.map((fullName) => this.renderApplicant(fullName));
    // TODO - Add a remove button
    return <div className="apartment-applicant-list">{content}</div>;
  }
}
