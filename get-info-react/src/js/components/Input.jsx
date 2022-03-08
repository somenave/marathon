import React from 'react';

// class Input extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <input type="text" placeholder="Type name" id="userName" className="input" defaultValue=""  onChange={e => this.props.onChangeName(e)} value={this.props.value}/>;
//     }
// }props.

const Input = ({onChange}) => {
    return (
        <input type="text" placeholder="Type name" id="userName" className="input" onChange={onChange}/>
    )
}

export default Input;
