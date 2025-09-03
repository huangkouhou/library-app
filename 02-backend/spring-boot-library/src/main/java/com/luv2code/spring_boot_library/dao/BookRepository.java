package com.luv2code.spring_boot_library.dao;


import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.luv2code.spring_boot_library.entity.Book;

public interface BookRepository extends JpaRepository<Book,Long> {
    //find by title
    Page<Book> findByTitleContaining(@Param("title") String title, Pageable pageable);

    // find by category
    Page<Book> findByCategory(@Param("category") String category, Pageable pageable);

    // find book by bookId
    @Query("select o from Book o where id in :book_ids")
    List<Book> findBooksByBookIds (@Param("book_ids") List<Long> bookId);
}

//extends JpaRepository<Book, Long>：继承后自动拥有常见 CRUD（增删改查）、分页、排序等方法。
//findByTitleContaining: 这是一个特殊的方法名，Spring Data JPA 会根据这个方法名自动生成并执行对应的 SQL 查询语句。
//返回值 Page<Book>：表示分页结果（包含内容、总页数、总条数、当前页等）。
//第二个参数 Pageable：告诉查询第几页、每页大小、按什么字段排序。
// (@Param("title") String title, Pageable pageable): 这是方法的参数。
// String title: 传入要搜索的书名关键字。
// Pageable pageable: 这是一个非常重要的参数对象。它告诉 Spring Data JPA 这个查询需要分页。我们可以通过它传入“需要第几页”和“每页显示多少条”等信息。
// Page<Book>: 这是方法的返回类型。
// 它不是简单地返回一个 List<Book>，而是返回一个 Page<Book> 对象。这个 Page 对象不仅包含了当前页的图书列表，还包含了总页数、总记录数等分页信息，非常方便前端展示分页栏。