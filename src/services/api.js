const isLocalhost = window.location.hostname === "localhost";

const API_URL = isLocalhost
  ? import.meta.env.VITE_API_URL_LOCAL
  : import.meta.env.VITE_API_URL_PROD;

console.log("Usando API:", API_URL);

export default API_URL;
