import Form from './Form';
import Output from './Output';
import { Component } from 'react';
import { sendRequest } from '../request';

const GENDER_URL = 'https://api.genderize.io?name=';
const COUNTRY_URL = 'https://api.nationalize.io?name=';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: null,
            country: null
        };
        this.getData = this.getData.bind(this);
    }

    getData(name) {
        if (name.length < 3) {
            this.setState({ warn: true });
            return;
        }
        sendRequest(`${GENDER_URL}${name}`)
            .then((json) => {
                if (!json.gender) {
                    throw new Error('Cannot find gender');
                }
                this.setState({ gender: json.gender, warn: false });
            })
            .catch(e => console.error(e.message));

        sendRequest(`${COUNTRY_URL}${name}`)
            .then((json) => {
                if (!json.country) {
                    throw new Error('Cannot find country');
                }
                const countries = [];
                json.country.forEach(country => countries.push(country.country_id));
                this.setState({ country: countries, warn: false });
            })
            .catch(e => console.error(e.message));
    }

    render() {
        return (
            <div className="container">
                <Form getData={this.getData}/>
                <Output gender={this.state.gender} country={this.state.country} warn={this.state.warn} />
            </div>
        );
    }
}

export default App;
