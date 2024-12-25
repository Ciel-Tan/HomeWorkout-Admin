import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://192.168.1.17:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});