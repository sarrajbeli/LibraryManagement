package com.project.biblio;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.time.LocalDate;


public class BookService {
    private final Map<Long, Book> books = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    // Ajouter un livre
    public Book addBook(String title, String author, String genre, LocalDate publicationDate, int stock) {
        Long id = idGenerator.getAndIncrement();
        Book book = new Book(id, title, author, genre, publicationDate, stock);
        books.put(id, book);
        return book;
    }

    // Récupérer tous les livres
    public List<Book> getAllBooks() {
        return new ArrayList<>(books.values());
    }

    // Récupérer un livre par ID
    public Book getBookById(Long id) {
        return books.get(id);
    }

    // Mettre à jour un livre
    public Book updateBook(Long id, String title, String author, String genre, LocalDate publicationDate, int stock) {
        Book book = books.get(id);
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
    public boolean deleteBook(Long id) {
        return books.remove(id) != null;
    }
}
