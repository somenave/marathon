import { UI_ELEMENTS } from "./view.js";

let genderUrl;
let countryUrl;
let genderResult;
let countryResult;
let firstName;

UI_ELEMENTS.userName.addEventListener('change', () => {
    firstName = UI_ELEMENTS.userName.value;
    genderUrl = `https://api.genderize.io?name=${firstName}`;
    countryUrl = `https://api.nationalize.io?name=${firstName}`;
});

UI_ELEMENTS.form.addEventListener('submit', (e) => {
    e.preventDefault();
    getGender(genderUrl, countryUrl);
    UI_ELEMENTS.form.reset();
});

function getGender(genderUrl, countryUrl) {
    fetch(genderUrl)
        .then(response => response.json())
        .then((json) => {
            if (!json.gender) {
                throw new Error('Cannot find gender');
            }
            genderResult = `${firstName} is ${json.gender}`;
            alert(genderResult);
        })
        .catch(e => alert(e.message));
    fetch(countryUrl)
        .then(response => response.json())
        .then((json) => {
            let currentCountry = json.country[0].country_id;
            if (!currentCountry) {
                throw new Error('Cannot find country');
            }
            countryResult = `${firstName} lives in ${currentCountry}`;
            alert(countryResult);
        })
        .catch(e => alert(e.message));
}


// an attempt to shorten the code

// function fetchUrl(url) {
//     let result;
//     let findValue;
//     fetch(url)
//         .then(response => response.json())
//         .then((json) => {
//             if (url == genderUrl) {
//                 findValue = json.gender;
//                 if (!findValue) {
//                     throw new Error(`Can't find gender`);
//                 }
//             } else if (url == countryUrl) {
//                 findValue = json.country[0].country_id;
//                 if (!findValue) {
//                     throw new Error(`Can't find country`);
//                 }
//             }

//             result = `${firstName} - ${findValue}`;
//             alert(result);
//         })
//         .catch(e => alert(e.message));
// }

// function getGender(genderUrl, countryUrl) {
//     firstName = UI_ELEMENTS.userName.value;
//     fetchUrl(genderUrl);
//     fetchUrl(countryUrl);
// }