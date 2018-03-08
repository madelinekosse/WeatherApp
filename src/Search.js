import React, { Component } from 'react';
import App from './App';
import './Search.css';
import Button from './Button';
import Form from './sportButton';
import style from './style.less';
import style_iphone from './sportButton/style_iphone.less';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      location: ''
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
     this.setState({location: this.props.location});
  }

  changeLocation = (e) => {
    this.setState({location: e.target.value});
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

handleChange(event) {
    if (event.target.id=="sport"){
    	console.log("sport picked");
    	this.setState({sport: event.target.value});
    }
    else{
    	console.log("submit");
    	event.preventDefault();
    	    this.setState({
                showComponent: true,
            });
    }
  }


render() {
    	return (
			<div className={ style_iphone.container }>
			<div className = { style.topbar }> our logo</div>
			{this.state.showComponent ?
                <App location={this.state.location}/> 
            :
                <div className={ style.mainwindow }>
				    <Form handler = {this.handleChange} className={ style_iphone.form } onSubmit={ this.handleChange }/ >
			    </div>
			}
			<div className = { style.footer }> some other crap</div>
			</div>
		);
  }
}

export default Search;
