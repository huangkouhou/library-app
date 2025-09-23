package com.luv2code.spring_boot_library.entity;  
import lombok.Data;
import jakarta.persistence.*;                   

@Entity
@Table(name = "book")
@Data
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "copies", nullable = false)
    private int copies;

    @Column(name = "copies_available", nullable = false)
    private int copiesAvailable;

    @Column(name = "category")
    private String category;

    @Lob
    @Column(name = "img", columnDefinition = "LONGTEXT")
    private String img;
}
