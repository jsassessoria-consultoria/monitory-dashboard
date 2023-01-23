import axios from 'axios';

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
  timeout: 1000
});

export default fetcher;
