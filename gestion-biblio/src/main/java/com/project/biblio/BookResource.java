package com.project.biblio;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookResource {
    private final BookService bookService = new BookService();

    // Récupérer tous les livres
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Ajouter un livre
    @POST
    public Response addBook(Book book) {
        Book newBook = bookService.addBook(
            book.getTitle(),
            book.getAuthor(),
            book.getGenre(),
            book.getPublicationDate(),
            book.getStock()
        );
        return Response.status(Response.Status.CREATED).entity(newBook).build();
    }

    // Récupérer un livre par ID
    @GET
    @Path("/{id}")
    public Response getBookById(@PathParam("id") Long id) {
        Book book = bookService.getBookById(id);
        if (book == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(book).build();
    }

    // Mettre à jour un livre
    @PUT
    @Path("/{id}")
    public Response updateBook(@PathParam("id") Long id, Book book) {
        Book updatedBook = bookService.updateBook(
            id,
            book.getTitle(),
            book.getAuthor(),
            book.getGenre(),
            book.getPublicationDate(),
            book.getStock()
        );
        if (updatedBook == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updatedBook).build();
    }

    // Supprimer un livre
    @DELETE
    @Path("/{id}")
    public Response deleteBook(@PathParam("id") Long id) {
        boolean deleted = bookService.deleteBook(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
