import React from 'react';

export default class Form extends React.Component {
  state = {
    fbLink: '',
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      fbLink: '',
    });
    this.props.onChange({
      fbLink: '',
    });
  };

  render() {
    return (
      <form>
        <input
          name="Add LINK FORM NAME"
          placeholder="FB LINK placeholder"
          input="input here"
          value={this.state.fbLink}
          onChange={e => this.change(e)}
        />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}
