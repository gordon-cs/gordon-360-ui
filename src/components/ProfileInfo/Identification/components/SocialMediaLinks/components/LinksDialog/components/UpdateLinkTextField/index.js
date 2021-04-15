import { TextField } from '@material-ui/core';
import React from 'react';
import { socialMediaInfo } from 'socialMedia';

const UpdateLinkTextField = ({ platform, label, value, onChange, error }) => {
  return (
    <div className={`gc360-links-dialog_content_${platform} gc360-links-dialog_content_media`}>
      <div className="gc360-links-dialog_content_icon">{socialMediaInfo[platform].icon}</div>
      <TextField
        id={`${platform}-input`}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={error ? `Invalid ${platform} link` : null}
        margin="dense"
        fullWidth
        multiline
        className="gc360-links-dialog_content_field"
        variant="outlined"
      />
    </div>
  );
};

export default UpdateLinkTextField;
