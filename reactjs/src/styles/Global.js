import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
  }

  input, button, body, textarea {
    font: 14px 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

`;
