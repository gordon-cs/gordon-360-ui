import Downshift from 'downshift';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './people-search.css';
import peopleSearch from '../../../../services/people-search';
const MIN_QUERY_LENGTH = 3;


//  TextBox Input Field
const renderInput = inputProps => {
  const { autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      className={'text-field'}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: 'people-search-root',
          input: 'people-search-input',
          inputDisabled: 'people-search-disabled',
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        ...other,
      }}
    />
  );
};

export default class GordonPeopleSearch extends Component {
  constructor(props) {
    super(props);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.reset = this.reset.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      suggestions: [],
      count:-1,
    };
    this.isMobileView = false;
    this.breakpointWidth = 400;
  }
  async getSuggestions(query) {
    // Bail if query is missing or is less than minimum query length
    if (!query || query.length < MIN_QUERY_LENGTH) {
      return;
    }
    
    //so apparently everything breaks if the first letter is capital, which is what happens on mobile
    //sometimes and then you spend four hours trying to figure out why downshift is not working
    //but really its just that its capitalized what the heck
    query = query.toLowerCase();

    let suggestions = await peopleSearch.search(query);

    // Sort first by last name, then by first name
    suggestions = sortBy(suggestions, ['LastName', 'FirstName']);

    // Remove any duplicate entries
    suggestions = uniqBy(suggestions, 'UserName');

    
    this.setState({ suggestions });
  }

  handleEnter = (key) =>
  {
    let counter = this.state.count;
    let theChosenOne;
    if( key === "Enter" )
    {
      if(this.state.suggestions && this.state.suggestions.length > 0)
      {
        counter === -1 ? theChosenOne = this.state.suggestions[0].UserName :
        theChosenOne = this.state.suggestions[counter].UserName;
        window.location.pathname = '/profile/' + theChosenOne;
        this.reset(); 
      }
    }
    if( key === "ArrowDown" )
    { 
        counter += 1;
        counter = counter % this.state.suggestions.length;
        this.setState({count:counter})
    }
    if( key === "ArrowUp" )
    {
        counter -= 1;
        if ( counter === -2 ) counter = 0;
        if ( counter === -1 ) counter = this.state.suggestions.length-1;
        this.setState({count:counter})
    }
  }
  reset() {
    // Remove chosen username from the input
    this.downshift.clearSelection();

    // Remove loaded suggestions
    this.downshift.clearItems();

    this.setState({ count:-1})
  }


  renderSuggestion(params) {
    const { suggestion, itemProps } = params;
    
    // Bail if any required properties are missing
    if (!suggestion.UserName || !suggestion.FirstName || !suggestion.LastName) {
      return null;
    }
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.UserName}
        component={Link}
        to={`/profile/${suggestion.UserName}`}
        onClick={this.reset}
        className={
          this.state.suggestions && this.state.suggestions[this.state.count]!==undefined ?
          suggestion.UserName === this.state.suggestions[this.state.count].UserName && this.state.count !== -1 ?
           "people-search-suggestion-selected ":"people-search-suggestion"
           :"people-search-suggestion"}
      >
        <Typography variant="body1">{`${suggestion.FirstName} ${suggestion.LastName}`}</Typography>
        <Typography variant="caption" component="p">
          {suggestion.UserName}
        </Typography>
      </MenuItem>
    );
  }

  //Makes People Search placeholder switch to People to avoid cutting it off
  //Has to rerender on screen resize in order to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    let placeholder = 'People Search';
    if (window.innerWidth < this.breakpointWidth) {
      placeholder = 'People';
    }
    return (
      <Downshift
        // Assign reference to Downshift to `this` for usage elsewhere in the component
        ref={downshift => {
          this.downshift = downshift;
        }}
        render={({ getInputProps, getItemProps, isOpen }) => (
          <span className="gordon-people-search">
            {renderInput(
              getInputProps({
                placeholder: placeholder,
                onChange: event => this.getSuggestions(event.target.value),
                onKeyDown: event => {this.handleEnter(event.key)},
              }),
            )}
            {isOpen && this.state.suggestions.length > 0 ? (
              <Paper square className="people-search-dropdown">
                { 
                  this.state.suggestions.map(suggestion =>
                  this.renderSuggestion({
                    suggestion,
                    itemProps: getItemProps({ item: suggestion.UserName }),
                  }),
                )}
              </Paper>
            ) : null}
          </span>
        )}
      />
    );
  }
}
