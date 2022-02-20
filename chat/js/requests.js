import Cookies from "../node_modules/js-cookie/dist/js.cookie.min.mjs";

export function sendRequest(url, method, body) {
  return fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${Cookies.get('token')}`
    },
    body: JSON.stringify(body)
  })
      .then(data => data.json())
}