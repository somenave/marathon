import Cookies from "../node_modules/js-cookie/dist/js.cookie.min.mjs";

// export function sendRequest(url, method, body) {
//   return fetch(url, {
//     method: method,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json;charset=utf-8',
//       Authorization: `Bearer ${Cookies.get('token')}`
//     },
//     body: JSON.stringify(body)
//   })
//       .then(data => data.json())
// }
export function sendRequest(url, options = {}) {
  options.method = options?.method ?? 'GET';
  options.headers = options?.headers ?? {'Accept': 'application/json', 'Content-Type': 'application/json;charset=utf-8', Authorization: `Bearer ${Cookies.get('token')}`}
  if (options.body) options.body = JSON.stringify(options.body)
  return fetch(url, options)
      .then(data => data.json())
}