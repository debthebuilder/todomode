const API_URL = "http://localhost:3030";

export const API = (endpoint, payload, method) => {
    const options = {
            method: method,
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(payload),
          };
    return fetch(`${API_URL}${endpoint}`, options);
  };