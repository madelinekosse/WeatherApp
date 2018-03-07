import React, { Component } from 'react';
import App from './App';
import './Search.css';
import Button from './Button';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }


  render() {
    return (
      <div>
            <Button onClick={this._onButtonClick}/>
            {this.state.showComponent ?
               <App/> :
               null
            }
      </div>
    );
  }
}

export default Search;
