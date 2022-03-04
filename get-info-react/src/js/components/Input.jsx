import React from 'react';
import {COUNTRY_URL, GENDER_URL} from "./Form";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
    this.onChangeName = this.onChangeName.bind(this);
  }
  
  onChangeName(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
    localStorage.setItem('username', this.state.username);
    localStorage.setItem('genderUrl', `${GENDER_URL}${localStorage.getItem('username')}`);
    localStorage.setItem('countryUrl', `${COUNTRY_URL}${localStorage.getItem('username')}`);
  }
  
  render() {
    return <input onChange={this.onChangeName} type="text" placeholder="Type name" id="userName" className="input" defaultValue="" value={this.state.value}/>;
  }
}

export default Input;