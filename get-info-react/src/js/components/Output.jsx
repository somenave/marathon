import { Component } from 'react';
// class Output extends Component {
//     render() {
//         if (this.props.warn) {
//             return <div className="warn">Please, enter your name (longer than two characters)</div>;
//         }
//
//         return (
//             <div className="output">
//                 <span className="output__title">Result:</span>
//                 <span>{this.props.gender && `your suggested gender - ${this.props.gender}`}</span>
//                 <span>{this.props.country && `country - ${this.props.country}`}</span>
//             </div>
//         );
//     }
// }

const Output = ({warn, gender, country}) => {
  if (warn) {
    return <div className="warn">Please, enter your name (longer than two characters)</div>;
  }
  
  return (
      <div className="output">
        <span className="output__title">Result:</span>
        <span>{gender && `your suggested gender - ${gender}`}</span>
        <span>{country && `country - ${country}`}</span>
      </div>
  );
}

export default Output;
