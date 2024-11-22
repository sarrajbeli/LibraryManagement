package com.project.biblio;
import jakarta.transaction.Transactional;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class BookService {

    @Transactional
    public Book addBook(String title, String author, String genre, LocalDate publicationDate, int stock) {
        Book book = new Book(null, title, author, genre, publicationDate, stock);
        book.persist();  
        return book;
    }

    @Transactional
    public List<Book> getAllBooks() {
        return Book.listAll();  // Utilise Panache pour récupérer tous les livres
    }

    @Transactional
    public Book getBookById(Long id) {
        return Book.findById(id);  // Recherche un livre par ID
    }

    // Mettre à jour un livre
    @Transactional
    public Book updateBook(Long id, String title, String author, String genre, LocalDate publicationDate, int stock) {
        Book book = Book.findById(id); // Cherche le livre par ID
        if (book == null) {
            return null;
        }
        book.setTitle(title);
        book.setAuthor(author);
        book.setGenre(genre);
        book.setPublicationDate(publicationDate);
        book.setStock(stock);
        return book;
    }

    // Supprimer un livre
    @Transactional
    public boolean deleteBook(Long id) {
        Book book = Book.findById(id);
        if (book != null) {
            book.delete();
            return true;
        }
        return false;
    }
}