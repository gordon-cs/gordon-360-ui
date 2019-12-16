//Written by Adam Princiotta

import React, { Component } from 'react';

const API_KEY = '6b9cd1d2df6ce413584eb076deea6888';

class App extends React.Component {
  state = {
    temperature: undefined,
    description: undefined,
    icon: undefined,
  };

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    console.log('getting weather');
    const API_CALL = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?id=4954801&APPID=6b9cd1d2df6ce413584eb076deea6888`,
    );
    const data = await API_CALL.json();
    //console.log("This is the data:", data);
    //This is the discrption of the weather
    this.setState({
      temperature: Math.floor(((data.list[0].main.temp - 273.15) * 9) / 5 + 32),
      description: data.list[0].weather[0].description,
      icon: `http://openweathermap.org/img/wn/` + data.list[0].weather[0].icon + `@2x.png`,
    });
    /*console.log("temp: ", this.state.temperature)
        console.log("description: ", this.state.description)
        console.log("iconURL: ", this.state.icon)*/
  };

  render() {
    return (
      <html>
      <head>

</head>
      <div class="information" >
      {this.state.temperature}°F {this.state.description}

    </div>  
</html>
    );
  }
}

export default App;
