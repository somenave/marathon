function sendRequest(url, options = {}) {
  options.method = options?.method ?? 'GET';
  options.headers = options?.headers ?? {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  };
  if (options.body) options.body = JSON.stringify(options.body);
  return fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
      });
}

export async function getGender(genderUrl) {
  await sendRequest(genderUrl)
      .then((json) => {
        if (!json.gender) {
          throw new Error('Cannot find gender');
        }
        const genderResult = `${localStorage.getItem('username')} is ${json.gender}`;
        alert(genderResult);
      })
      .catch(e => alert(e.message));
}

export async function getCountry(countryUrl) {
  await sendRequest(countryUrl)
      .then((json) => {
        if (!json.country) {
          throw new Error('Cannot find country');
        }
        const countries = [];
        json.country.forEach(country => countries.push(country.country_id));
        const countryResult = `${localStorage.getItem('username')} lives in ${[...countries]}`;
        alert(countryResult);
      })
      .catch(e => alert(e.message));
}
