import Dropzone from 'react-dropzone';
import React, { Component } from 'react';
import {
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Row,
} from 'reactstrap';

import './activity-edit.css';
import GordonButton from '../../components/Button';

const getUploadContents = (image) => {
  if (image) {
    return (<img className="activity-edit-upload-preview" src={image.preview} alt="" />);
  }
  return (
    <p className="activity-edit-upload-description">
      Drop files here or click to select files
    </p>
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
      <Container>
        <Row className="justify-content-center">
          <Col className="activity-edit-container" xs="12" md="6">
            <h1>Edit Activity</h1>
            <Form>
              <FormGroup>
                <Label htmlFor="editActivityWebsite">Website</Label>
                <Input id="editActivityWebsite" type="text" />
              </FormGroup>
              <Dropzone
                className="activity-edit-upload"
                accept="image/png,image/jpg,image/jpeg,image/bmp,image/gif"
                multiple={false}
                onDrop={this.onDrop}
              >
                { getUploadContents(this.state.image) }
              </Dropzone>
              <FormText>
                Preferred image size: 320x320px
                <br />
                Accepted file types: PNG, JPG, JPEG, BMP, GIF
              </FormText>
              <br />
              <FormGroup>
                <Label htmlFor="editActivityDescription">Description</Label>
                <Input type="textarea" id="editActivityDescription" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="editActivityJoining">Special Information for Joining</Label>
                <Input type="textarea" id="editActivityJoining" />
              </FormGroup>
              <FormGroup>
                <Row className="justify-content-between">
                  <Col xs="auto">
                    <GordonButton color="secondary">cancel</GordonButton>
                  </Col>
                  <Col xs="auto">
                    <GordonButton color="primary" type="submit">submit changes</GordonButton>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
