import { Component } from 'react';
import '../../index.css';
import Button from './Button';
import Input from './Input';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.getData(this.state.value);
    }
    
    onChangeName = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="form" action="" id="form">
                <Input onChange={this.onChangeName} value={this.state.value} defaultValue=""/>
                <Button />
            </form>
        );
    }
}

export default Form;
