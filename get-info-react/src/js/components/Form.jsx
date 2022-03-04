import React, {Component} from 'react';
import '../../index.css';
import Button from "./Button";
import Input from "./Input";
import {getCountry, getGender} from "../request";

export const GENDER_URL = 'https://api.genderize.io?name=';
export const COUNTRY_URL = 'https://api.nationalize.io?name=';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (!localStorage.getItem('username')) return;
    getGender(localStorage.getItem('genderUrl'));
    getCountry(localStorage.getItem('countryUrl'));
    e.target.reset();
  }

  render() {
    return (
        <form onSubmit={this.onSubmitHandler} className="container form" action="" id="form">
          <Input value={this.state.username}/>
          <Button />
        </form>
    )
  }
}


export default Form;
