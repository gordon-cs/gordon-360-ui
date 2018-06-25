import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';
import React, { Component } from 'react';

const getUploadContents = image => {
  if (image) {
    return <img className="activity-edit-upload-preview" src={image.preview} alt="" />;
  }
  return (
    <p className="activity-edit-upload-description">Drop files here or click to select files</p>
  );
};

export default class ActivityEdit extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop([image]) {
    this.setState({ image });
  }
  render() {
    return (
      <section>
        <h1>Edit Activity</h1>
        <form>
          <label htmlFor="editActivityWebsite">
            Website
            <input id="editActivityWebsite" type="text" />
          </label>
          <Dropzone
            className="activity-edit-upload"
            accept="image/png,image/jpg,image/jpeg,image/bmp,image/gif"
            multiple={false}
            onDrop={this.onDrop}
          >
            {getUploadContents(this.state.image)}
          </Dropzone>
          <p>
            Preferred image size: 320x320px
            <br />
            Accepted file types: PNG, JPG, JPEG, BMP, GIF
          </p>
          <br />
          <label htmlFor="editActivityDescription">
            Description
            <input type="textarea" id="editActivityDescription" />
          </label>
          <label htmlFor="editActivityJoining">
            Special Information for Joining
            <input type="textarea" id="editActivityJoining" />
          </label>
          <Button>cancel</Button>
          <Button color="primary" variant="submit">
            submit changes
          </Button>
        </form>
      </section>
    );
  }
}
