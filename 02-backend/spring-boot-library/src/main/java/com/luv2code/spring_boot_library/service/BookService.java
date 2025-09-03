package com.luv2code.spring_boot_library.service;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luv2code.spring_boot_library.dao.BookRepository;
import com.luv2code.spring_boot_library.dao.CheckoutRepository;
import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.entity.Checkout;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentLoansResponse;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;

    //when we use this service, we can use the book repository and checkout repository(constructor dependency)
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository){
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

    //get how many elements are in the list function(only numbers)
    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    //CurrentLoans function(currentloans content)
    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {

        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);//查出这个用户的所有借阅记录
        List<Long> bookIdList = new ArrayList<>();

        for (Checkout i: checkoutList){
            bookIdList.add(i.getBookId());//从借阅记录里提取出所有被借的书籍 ID。
        }

        //按这些 ID 把对应的书信息整体查出来（书名、作者、封面等）。
        List<Book> books = bookRepository.findBooksByBookIds(bookIdList);//find this function in BookRepository
        
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        //遍历每本书，在用户的借阅记录 checkoutList 里找对应这本书的那条借阅。
        for (Book book : books) {
            Optional<Checkout> checkout = checkoutList.stream()
                .filter(x -> x.getBookId() == book.getId()).findFirst();

            //如果找到了这本书的借阅记录：返回“当前借阅清单 + 各自剩余天数”。
            if (checkout.isPresent()){

                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) difference_In_Time));
            }
        }
        
        return shelfCurrentLoansResponses;


    }

}
