import React, { useState } from 'react';
import { updateBook } from '../api';
import { TextField, Button, Paper, Typography } from '@mui/material';

const EditBook = ({ book, onUpdate, onCancel }) => {
  const [updatedBook, setUpdatedBook] = useState({ ...book });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBook(updatedBook.id, updatedBook);
    onUpdate();  // Rafraîchir la liste après modification
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>Modifier le Livre</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Titre" name="title" fullWidth margin="normal" value={updatedBook.title} onChange={handleChange} required />
        <TextField label="Auteur" name="author" fullWidth margin="normal" value={updatedBook.author} onChange={handleChange} required />
        <TextField label="Genre" name="genre" fullWidth margin="normal" value={updatedBook.genre} onChange={handleChange} required />
        <TextField label="Date de Publication" name="publicationDate" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={updatedBook.publicationDate} onChange={handleChange} required />
        <TextField label="Stock" name="stock" type="number" fullWidth margin="normal" value={updatedBook.stock} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">Mettre à jour</Button>
        <Button onClick={onCancel} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>Annuler</Button>
      </form>
    </Paper>
  );
};

export default EditBook;
