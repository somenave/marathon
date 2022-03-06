import { Component } from 'react';
import '../../index.css';
import Button from './Button';
import Input from './Input';

class Form extends Component {
    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.getData(e.target.querySelector('input').value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="form" action="" id="form">
                <Input />
                <Button />
            </form>
        );
    }
}

export default Form;
