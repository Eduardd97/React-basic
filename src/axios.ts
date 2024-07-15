import axios from "axios";

export const client = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'})

export const todosApi = axios.create({baseURL:  'https://jsonplaceholder.typicode.com'})

export const postApi = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'})
