package com.luv2code.spring_boot_library.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luv2code.spring_boot_library.dao.BookRepository;
import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.requestmodels.AddBookRequest;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;

    public AdminService (BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public void postBook(AddBookRequest addBookRequest){
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());
        bookRepository.save(book);
    }

}
