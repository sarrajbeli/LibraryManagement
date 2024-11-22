import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8084/books', 
});

export const getAllBooks = () => api.get('/');
export const createBook = (book) => api.post('/', book);
export const updateBook = (id, book) => api.put(`/${id}`, book);
export const deleteBook = (id) => api.delete(`/${id}`);
