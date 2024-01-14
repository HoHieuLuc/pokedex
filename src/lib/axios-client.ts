import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

const axiosClient = applyCaseMiddleware(instance, {
  caseFunctions: {
    camel: (input) => {
      return (input.charAt(0).toLowerCase() + input.slice(1)).replace(
        /[_](.)/g,
        (match, group1: string) => group1.toUpperCase(),
      );
    },
  },
});

export default axiosClient;
