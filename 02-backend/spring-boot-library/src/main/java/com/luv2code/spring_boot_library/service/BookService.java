package com.luv2code.spring_boot_library.service;


import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luv2code.spring_boot_library.dao.BookRepository;
import com.luv2code.spring_boot_library.dao.CheckoutRepository;
import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.entity.Checkout;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;

    //when we use this service, we can use the book repository and checkout repository(constructor dependency)
    BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository){
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }
    // checkout function
    public Book checkoutBook (String userEmail, Long bookId) throws Exception{

        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0){
            throw new Exception("Book doesn't exist or already checked out by user");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        //create a new record in the database with the user email.
        Checkout checkout = new Checkout(
            userEmail,
            LocalDate.now().toString(),
            LocalDate.now().plusDays(7).toString(),
            book.get().getId()
        );

        checkoutRepository.save(checkout);

        return book.get();
    }

    //Checkout possibility function
    public Boolean checkoutBookByUser(String userEmail, Long bookId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout != null){
            return true;
        } else {
            return false;
        }
    }

    //get how many elements are in the list function
    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }


}
