import React from 'react';

class Input extends React.Component {
    render() {
        return <input type="text" placeholder="Type name" id="userName" className="input" defaultValue=""/>;
    }
}

export default Input;
