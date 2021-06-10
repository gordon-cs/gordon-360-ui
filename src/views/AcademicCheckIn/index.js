/*
import React, { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import Login from 'views/Login';
import CheckInQuestion from 'components/CheckInQuestion';
import user from 'services/user';
import checkIn from 'services/checkIn';
import MainPage from 'views/AcademicCheckIn/components/MainPage';
import './index.css';
import CheckInStatus from 'views/AcademicCheckIn/components/status';

const AcademicCheckIn = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);

  const [currentStatus, setCurrentStatus] = useState(null);
  const [username, setUsername] = useState(null);

  // Every time the page is updated, verify the user is logged in, and update any necessary info
  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication, currentStatus]);

  // Load the user's checkIn status from the API and update accordingly
  const loadPage = async () => {
    setLoading(true);
    setLoading(false);
  }

  
  // If loadPage has not finished, display loader
  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) { // Else if the user is not logged in, display login page
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else {
    return (<MainPage/>);
  }
};


export default AcademicCheckIn;
*/
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  TextField,
  FormControl,
} from '@material-ui/core';

const AcademicCheckIn = (props) => {
  const [state, setState] = useState({
    currentStep: 1,
    email: '',
    username: '',
    password: '',
    name: '',
  });

  // useEffect(() => {}, [email, username, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Your registration detail: \n 
           Email: ${state.email} \n 
           Username: ${state.username} \n
           Password: ${state.password} \n
           Wizard: 🧙‍♂️`);
  };

  const _next = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    setState({
      currentStep: currentStep,
    });
  };

  const _prev = () => {
    let currentStep = state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setState({
      currentStep: currentStep,
    });
  };
  /*
   * the functions for our button 🧙‍♂️
   */
  const previousButton = () => {
    if (state.currentStep !== 1) {
      return (
        <Button variant="contained" onClick={_prev}>
          Previous
        </Button>
      );
    } else {
      return null;
    }
  };

  const nextButton = () => {
    if (state.currentStep < 3) {
      return (
        <Button variant="contained" onClick={_next}>
          Next 🧙‍♂️
        </Button>
      );
    } else {
      return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      [name]: value,
    });
  };
  return (
    <React.Fragment>
      <h1>React Wizard Form 🧙‍♂️ </h1>
      <p>Step {state.currentStep} </p>

      <form onSubmit={handleSubmit}>
        {/* 
        render the form steps and pass required props in
        */}
        <Step1
          currentStep={state.currentStep}
          handleChange={state.handleChange}
          email={state.email}
        />
        <Step2
          currentStep={state.currentStep}
          handleChange={state.handleChange}
          username={state.username}
        />
        <Step3
          currentStep={state.currentStep}
          handleChange={state.handleChange}
          password={state.password}
        />
        {previousButton()}
        {nextButton()}
      </form>
    </React.Fragment>
  );
};

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="email">Email address</label>
      <TextField
        className="form-control"
        id="email"
        label="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
      />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <TextField
        className="form-control"
        id="username"
        label="username"
        type="text"
        placeholder="Enter username"
        value={props.username}
        onChange={props.handleChange}
      />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <TextField
          className="form-control"
          id="password"
          label="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
        />
      </div>
      <Button variant="contained" onClick={props.handleSubmit}>
        Sign up
      </Button>
    </React.Fragment>
  );
}

export default AcademicCheckIn;
