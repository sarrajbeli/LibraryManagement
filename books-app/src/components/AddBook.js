import React, { useState } from 'react';
import { createBook } from '../api';
import { TextField, Button, Paper, Typography } from '@mui/material';

const AddBook = ({ onAdd }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook(book);
    onAdd();  
    setBook({ title: '', author: '', genre: '', publicationDate: '', stock: '' });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>Ajouter un Livre</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Titre" name="title" fullWidth margin="normal" value={book.title} onChange={handleChange} required />
        <TextField label="Auteur" name="author" fullWidth margin="normal" value={book.author} onChange={handleChange} required />
        <TextField label="Genre" name="genre" fullWidth margin="normal" value={book.genre} onChange={handleChange} required />
        <TextField label="Date de Publication" name="publicationDate" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={book.publicationDate} onChange={handleChange} required />
        <TextField label="Stock" name="stock" type="number" fullWidth margin="normal" value={book.stock} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">Ajouter</Button>
      </form>
    </Paper>
  );
};

export default AddBook;
