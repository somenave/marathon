export function sendRequest(url, options = {}) {
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
