import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import React, { Component } from 'react';
import 'date-fns';
import user from './../../../services/user';
import '../apartmentAppComponents.css';

const getFullName = (username) => {
  try {
    return String(user.getProfileInfo(username).fullName);
  } catch (error) {
    console.log(error);
    return String(username);
  }
};

export default class ApplicantListFields extends Component {
  render() {
    const applicantList = this.props.applicantList;
    const fullNameList = applicantList.map((username) => getFullName(username));
    const content = fullNameList.map((fullName) => (
      <TextField
        key={fullName + '-textfield'}
        value={fullName}
        label="Applicant"
        variant="outlined"
        className={'text-field'}
        InputProps={{
          classes: {
            root: 'people-search-root',
            input: 'people-search-input',
          },
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
    ));
    // TODO - Add a remove button
    return <div className="apartment-applicant-list">{content}</div>;
  }
}
