import React, { Component } from 'react';
import Button from './Button';
import './App.css';

const WUNDERGROUND_KEY = "b56f2c0800fdf6e4";

const ICON_SET = {
    chancesleet: "snowy",
    chancesnow: "snowy",
    clear: "sunny",
    flurries: "snowy",
    fog: "cloudy",
    hazy: "cloudy",
    rain: "rainy",
    chancerain: "rainy",
    sleet: "snowy",
    snow: "snowy",
    chanceflurries: "snowy",
    tstorms: "stormy",
    chancetstorms: "stormy",
    sunny: "sunny",
    mostlysunny: "sunny",
    partlysunny: "sunny",
    partlycloudy: "cloudy",
    mostlycloudy: "cloudy",
    cloudy: "cloudy"
};

function getIcon(icon) {
    return ICON_SET[icon];
}

function getTemp (text) {
    return (text.match(/(\-?[0-9]+)/) || [])[1];
}


class App extends Component {

  constructor (props) {
      super(props);
      this.state = {
        dest: ''
      };

      var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
      };

      /*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
              this.setState({
                  coordinates: pos.coords
              });
              this.check();
          }, () => {
              this.check();
          }, options);
      }*/

      this.check();

      setInterval(() => this.check(), 10 * 60 * 1000);
      //this.changeLocation = this.changeLocation.bind(this);
  }

  check () {
      /*var REQUEST_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA_wOxjHNfPhmKu2zBo8N5HXsEpewgIQF0";
      fetch(REQUEST_URL)
        .then(response => response.json())
        .then(locate => {
           this.setState({
               locate
           });
        });*/

    //crd['results'][0]['geometry']['location']['lng']

      fetch("https://ipinfo.io/json")
        .then(res => res.json())
        .then(ip => {
            let lang = "EN";
            let crd = this.state.locate;
            crd = crd || {
                latitude: "35.6895"
              , longitude: "139.6917"
            }
            const query = [crd.latitude, crd.longitude].join(",");
            const WUNDERGROUND_URL = `https://api.wunderground.com/api/${WUNDERGROUND_KEY}/forecast/lang:${lang}/q/${query}.json`;
            return fetch(WUNDERGROUND_URL)
        })
        .then(c => c.json())
        .then(forecast => {
            this.setState({
                forecast
            });
        });
  }

  renderWeatherToday () {
      const todayTXT = this.state.forecast.forecast.txt_forecast.forecastday[0];
      const todaySIMP = this.state.forecast.forecast.simpleforecast.forecastday[0];
      const temp = getTemp(todayTXT.fcttext_metric);

      let icon = getIcon(todayTXT.icon);
      let hours = new Date().getHours();
      if ((icon === "sunny" || icon === "clear") && (hours > 20 || hours < 7)) {
          icon = "starry";
      }

      return (
          <div className="weather">
            <div className="temperature">
                <div className={`icon-big ${icon}`}></div>
                <div className="big-temp">{temp}</div>
            </div>
            <div className = "wind">Wind</div>
            <div className = "windspeed">
              {todaySIMP.avewind.mph}
            </div>
            <div className = "winddir">
              {todaySIMP.avewind.dir}
            </div>
            <div className = "humidity">Humidity</div>
            <div className = "avehumidity">{todaySIMP.avehumidity}</div>
          </div>
      );

      //todaySIMP.date.weekday
      //todaySIMP.high.celcius
      //todaySIMP.low.celcius
      //todaySIMP.icon
      //todaySIMP.avewind.mph
      //todaySIMP.avewind.dir
      //todaySIMP.avehumidity
      //todaySIMP.qpf_allday

  }

  renderDay (day, index) {
      const temp = getTemp(day.fcttext_metric);

      if (temp) {
          var tempElm = <div className="small-temp">{temp}</div>;
      }

      return (
            <div className="day" key={index}>
                <div className="name-of-days">{day.title}</div>
                <div className="day-description">
                    {day.fcttext_metric}
                </div>
                <div className="icon-wrapper">
                    <div className={`icon-small ${getIcon(day.icon)}`}>
                    </div>
                    {tempElm}
                </div>
            </div>
      );
  }

  renderNextDays () {
      const nextDays = []
          , data = this.state.forecast.forecast.txt_forecast.forecastday
          ;

      for (var i = 2; i < data.length; i += 2) {
        nextDays.push(data[i])
      }

      return (
          <div className="weather-next-days">
            {nextDays.map((c, i) => this.renderDay(c, i))}
          </div>
      );
  }

  renderWeather () {
      if (!this.state.forecast) {
          return (
            <div className="loading-message">
                <p>Loading...</p>
            </div>
          );
      }
      return (
        <div>
            {this.renderWeatherToday()}
        </div>
      );
  }

  render() {
    return (
        <div>
            <div {...this.props} className="app">
              <div className="search-location-name">
                {this.state.dest = this.props.location}
                </div>
                {this.renderWeather()}
            </div>
            <button onChange={this.changeLocation}>{this.state.dest = this.props.location}</button>
            <button>{this.state.dest}</button>
        </div>
    );
  }
}

export default App;
