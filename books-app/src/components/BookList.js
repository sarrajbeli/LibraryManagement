import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../api';
import AddBook from './AddBook';
import EditBook from './EditBook';
import { Container, List, ListItem, ListItemText, Button, Typography, Paper } from '@mui/material';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await getAllBooks();
    setBooks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const handleShowAddForm = () => {
    setShowAddForm(true); 
    setEditingBook(null);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
    fetchBooks(); 
  };
  const handleEdit = (book) => {
    setEditingBook(book);
    setShowAddForm(false); 
  };

  const handleUpdate = () => {
    fetchBooks();  
    setEditingBook(null);  
  };
   
  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">Gestion des Livres</Typography>

      {/* Affiche le formulaire d'ajout si aucun livre n'est en cours de modification */}
      {!editingBook && !showAddForm && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleShowAddForm} 
          style={{ marginBottom: '20px' }}
        >
          Ajouter un Livre
        </Button>
      )}

      {/* Formulaire d'ajout */}
      {showAddForm && <AddBook onAdd={handleHideAddForm} />}

      {/* Formulaire de modification */}
      {editingBook && <EditBook book={editingBook} onUpdate={handleUpdate} onCancel={() => setEditingBook(null)} />}

      {/* Liste des livres */}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <List>
          {books.map((book) => (
            <ListItem key={book.id} divider>
              <ListItemText
                primary={`${book.title} - ${book.author}`}
                secondary={`Genre: ${book.genre} | Stock: ${book.stock}`}
              />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleEdit(book)} 
                style={{ marginRight: '10px' }}
              >
                Modifier
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => handleDelete(book.id)}
              >
                Supprimer
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BookList;
